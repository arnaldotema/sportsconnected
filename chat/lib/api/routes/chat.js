"use strict";

const express = require("express");
const router = express.Router();
const { get, post, put, delete: del } = router;

const chat = require("../controllers/chat");

// Chat Messages

get("/messages/:messageId", chat.getMessage);

post("user/:userInfoId/messages", chat.createMessage);

put("/messages/:messageId", chat.editMessage);

del("/messages/:messageId", chat.deleteMessage);

// Chat Unread Messages

get("/user/:userInfoId/unread", chat.getUnreadMessagesByUserId);

// Chat Conversations

get(
  "/user/:userInfoId/conversations/:conversationId",
  chat.getConversationByUserAndConversationId
);

get("/user/:userInfoId/conversations", chat.getConversationsByUserId);

post("user/:userInfoId/conversations", chat.createConversation);

module.exports = router;
