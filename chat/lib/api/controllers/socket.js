"use strict";

const { createChatMessage } = require("../../api/services/message");
const { createUnreadMessage } = require("../../api/services/unread");
const { createConversation } = require("../../api/services/conversation");
const {
  getParticipantsByConversationId
} = require("../../api/services/conversation");

module.exports = io => {
  io.sockets
    .on("connection", () => {
      console.log("On connection was called.");
    })
    .on("authenticated", function(socket) {
      console.log("On authenticated was called.");

      console.log(`Hello ${socket.decoded_token.name}!`);

      const userId = socket.decoded_token.secret;

      console.log(`User ${userId} has connected.`);

      // Join the user's private room (by id)
      // User's notifications, messages and etc will be pushed into its private room

      socket.join(userId);

      socket.on("reconnect", function(socket) {
        console.log(`user ${socket.id} trying to reconnect.`);
      });

      socket.on("room:create", function(data) {
        const userId = socket.decoded_token.secret;
        const participants = data.participants;

        // todo
        // what here? Figure it out after FE
        const conversation = createConversation(userId, participants);
        socket.emit("room:created", conversation._id);
      });

      socket.on("disconnect", function() {
        console.log(`user ${socket.id} disconnected`);
      });

      socket.on("message", data => {
        const user = {
          name: data.user.name,
          _id: socket.decoded_token.secret,
          avatar: data.user.avatar
        };
        const msg = {
          text: data.text,
          chat_conversation_id: data.chat_conversation_id
        };

        const participants = getParticipantsByConversationId(
          data.chat_conversation_id
        );

        createChatMessage(user, msg).then((err, msg) => {
          participants.forEach(participant => {
            socket.broadcast.to(participant._id).emit("new message", msg);
          });
        });
      });

      socket.on("message:read", data => {
        const userId = socket.decoded_token.secret;
        const msgId = data.chat_message_id;

        createUnreadMessage(userId, msgId).then((err, msg) => {
          // Todo:
          // what here? Figure it out after FE
        });
      });

      socket.on("recommendation", data => {
        // Todo: Implement recommendation notification
        socket.broadcast.emit("recommendation", data);
      });

      socket.on("achievement", () => {
        // Todo: Implement achievement notification
        socket.broadcast.emit("achievement", {
          message: "I'm achieved!"
        });
      });
    });
};
