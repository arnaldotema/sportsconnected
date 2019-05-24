"use strict";

const express = require("express");
const router = express.Router();

const chat = require("../controllers/chat");

// Chat Messages

router.get("/messages/:messageId", chat.getMessage);

router.post("user/:userInfoId/messages", chat.createMessage);

router.put("/messages/:messageId", chat.editMessage);

router.delete("/messages/:messageId", chat.deleteMessage);

// Chat Unread Messages

router.get("/user/:userInfoId/unread", chat.getUnreadMessagesByUserId);

// Chat Conversations

router.get(
  "/user/:userInfoId/conversations/:conversationId",
  chat.getConversationByUserAndConversationId
);

router.get("/user/:userInfoId/conversations", chat.getConversationsByUserId);

router.post("user/:userInfoId/conversations", chat.createConversation);

module.exports = router;
