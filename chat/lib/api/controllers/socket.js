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

module.exports = io => {
  io.sockets
    .on("connection", () => {
      console.log("On connection was called.");
    })
    .on("authenticated", socket => {
      console.log(`${socket.decoded_token.name} is authenticated.`);
      console.log(`This is his/her id: ${socket.decoded_token.secret}.`);

      const userId = socket.decoded_token.secret;

      socket.join(userId);

      socket.on("reconnect", socket => {
        console.log(`user ${socket.id} trying to reconnect.`);
      });

      socket.on("disconnect", socket => {
        console.log(`user ${socket.id} disconnected`);
      });

      socket.on("conversation:create", async data => {
        const userId = socket.decoded_token.secret;
        const participants = data.participants;
        const conversation = await createConversation(userId, participants);

        socket.emit("conversation:created", conversation._id);
      });

      socket.on("message", async data => {
        const user = {
          name: data.user.name,
          _id: socket.decoded_token.secret,
          avatar: data.user.avatar
        };
        const msg = {
          text: data.text,
          chat_conversation_id: data.chat_conversation_id
        };

        const participants = await getParticipantsByConversationId(
          data.chat_conversation_id
        );

        const createdMessage = await createChatMessage(user, msg);

        participants.forEach(participant => {
          console.log(
            `Message "${createdMessage.text}" with id ${
              createdMessage._id
            } from ${createdMessage.sender} 
          was sent to ${userId} `
          );

          socket.broadcast.to(participant._id).emit("message", createdMessage);
        });
      });

      socket.on("message:unread", async data => {
        const userId = socket.decoded_token.secret;
        const msgId = data.chat_message_id;
        const msg = await createUnreadMessage(userId, msgId);
        const participants = await getParticipantsByConversationId(
          data.chat_conversation_id
        );

        console.log(
          `Message "${msg.text}" with id ${msg._id} from ${
            msg.sender
          } was added to unread messages`
        );

        participants.forEach(participant => {
          socket.broadcast.to(participant._id).emit("message:unread", msg);
        });
      });

      socket.on("message:read", async data => {
        const userId = socket.decoded_token.secret;
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
          socket.broadcast.to(participant._id).emit("message:read", msg);
        });
      });

      socket.on("typing:started", async data => {
        const { conversation, userId, participants } = data;

        participants.forEach(p =>
          socket.broadcast.to(p._id).emit("typing:started", {
            userId,
            conversationId: conversation._id
          })
        );
      });

      socket.on("typing:stopped", async data => {
        const { conversation, userId, participants } = data;

        participants.forEach(p =>
          socket.broadcast.to(p._id).emit("typing:stopped", {
            userId,
            conversationId: conversation._id
          })
        );
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
