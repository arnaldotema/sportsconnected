"use strict";

const express = require("express");
const router = express.Router();
const { get, post, put, delete: del } = router;

const {
  getChatMessage,
  createChatConversation,
  deleteChatMessage,
  editChatMessage,
  createChatMessage,
  getConversations,
  getUnreadChatMessages,
  getConversation
} = require("../controllers/chat");

get("/:id/messages", getChatMessage);

get("/:id/unread", getUnreadChatMessages);

get("/:id/conversations", getConversations);

get("/:id/conversations/:conversation_id", getConversation);

post("/:id/conversations", createChatConversation);

del("/:id/messages", deleteChatMessage);

put("/:id/messages", editChatMessage);

post("/:id/messages", createChatMessage);

module.exports = router;
