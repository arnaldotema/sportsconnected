"use strict";

const {
  createChatMessage,
  setMessageRead
} = require("../../api/services/message");
const {
  createUnreadMessage,
  removeUnreadMessage
} = require("../../api/services/unread");
const {
  createConversation,
  getParticipantsByConversationId
} = require("../../api/services/conversation");

/**
 *
 * This is an ephemeral implementation.
 *
 * There isn't any authentication or authorisation process for socket connections.
 *
 * Socket data is persisted in the socket.handshake.query field upon connection,
 * and the userId is hardcoded into the socket.userId field in memory variable.
 *
 * All in all, client side needs to include { query: 'userId=<USER_ID>' } in the socket connection object.
 *
 */

module.exports = io => {
  const connectedClients = [];

  io.sockets.on("connection", socket => {
    if (socket.handshake.query && socket.handshake.query.userId) {
      const userId = socket.handshake.query.userId;
      console.log(`Successful connection! user id: ${userId}`);

      connectedClients.push(socket);

      socket.userId = userId;
      socket.join(userId);
    } else {
      return socket.emit(
        "exception",
        "connection event must include query.userId"
      );
    }

    socket.on("reconnect", socket => {
      console.log(`user ${socket.userId} trying to reconnect.`);
    });

    socket.on("disconnect", () => {
      const index = connectedClients.indexOf(socket);
      console.log(`user ${socket.userId} has disconnected`);
      connectedClients.splice(index, 1);
    });

    socket.on("conversation:create", async data => {
      const participants = data.participants;

      if (!participants) {
        socket.emit(
          "exception",
          "conversation:create event must have participants"
        );
      }

      const conversation = await createConversation(participants);
      socket.emit("conversation:created", conversation._id);
    });

    socket.on("message", async data => {
      const msg = data.msg;
      const createdMessage = await createChatMessage(msg);
      const participants = await getParticipantsByConversationId(
        msg.chat_conversation_id
      );

      participants.forEach(participant => {
        const participantSocket = connectedClients.find(
          connectedSocket => connectedSocket.userId === participant._id
        );

        if (participantSocket) {
          participantSocket.emit("message", createdMessage);
          console.log(
            `Message "${createdMessage.text}" with id ${
              createdMessage._id
            } from ${createdMessage.sender._id} was sent to ${participant._id}`
          );
        }
      });
    });

    socket.on("message:unread", async data => {
      const userId = socket.userId;
      const msgId = data.chat_message_id;
      const msg = await createUnreadMessage(userId, msgId);
      const participants = await getParticipantsByConversationId(
        data.chat_conversation_id
      );

      console.log(
        `Message "${msg.text}" with id ${msg._id} from ${
          msg.sender._id
        } was added to unread messages`
      );

      participants.forEach(participant => {
        const participantSocket = connectedClients.find(
          connectedSocket => connectedSocket.userId === participant._id
        );

        if (participantSocket) {
          participantSocket.emit("message:unread", msg);
          console.log(
            `Message "${msg.text}" with id ${msg._id} from ${
              msg.sender._id
            } was sent to ${participant._id} as unread`
          );
        }
      });
    });

    socket.on("message:read", async data => {
      const userId = socket.userId;
      const msgId = data.chat_message_id;
      const msg = await removeUnreadMessage(userId, msgId);
      await setMessageRead(msgId);
      const participants = await getParticipantsByConversationId(
        data.chat_conversation_id
      );

      console.log(
        `Message "${msg.text}" with id ${msg._id} from ${
          msg.sender
        } was removed from unread messages`
      );

      participants.forEach(participant => {
        const participantSocket = connectedClients.find(
          connectedSocket => connectedSocket.userId === participant._id
        );

        if (participantSocket) {
          participantSocket.emit("message:read", msg);
          console.log(
            `Message "${msg.text}" with id ${msg._id} from ${
              msg.sender._id
            } was sent to ${participant._id} as read`
          );
        }
      });
    });

    socket.on("typing:started", async data => {
      const conversationId = data.conversationId;
      const participants = data.participants;

      participants.forEach(participant => {
        const participantSocket = connectedClients.find(
          connectedSocket => connectedSocket.userId === participant._id
        );

        if (participantSocket) {
          participantSocket.emit("typing:started", {
            userId: socket.userId,
            conversationId
          });
        }
      });
    });

    socket.on("typing:stopped", async data => {
      const conversationId = data.conversationId;
      const participants = data.participants;

      participants.forEach(participant => {
        const participantSocket = connectedClients.find(
          connectedSocket => connectedSocket.userId === participant._id
        );

        if (participantSocket) {
          participantSocket.emit("typing:stopped", {
            userId: socket.userId,
            conversationId
          });
        }
      });
    });

    socket.on("recommendation", async data => {
      // todo add notification
      socket.broadcast.emit("recommendation", data);
    });

    socket.on("achievement", async data => {
      // todo add notification
      socket.broadcast.emit("achievement", data);
    });
  });
};
