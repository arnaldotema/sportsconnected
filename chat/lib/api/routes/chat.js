"use strict";

const express = require("express");
const router = express.Router();

const chat = require("../controllers/chat");

// Chat Messages

router.get("/messages/:messageId", chat.getMessage);

router.post("/messages", chat.createMessage);

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

router.post("/conversations", chat.createConversation);

// Health check

router.get("/healthcheck", chat.ping);

module.exports = router;
