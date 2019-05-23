"use strict";

const ChatMessage = require("../../models/chat_message");

exports.createChatMessage = async (user, msg) => {
  const chatMessage = {
    sender: {
      name: user.name,
      info_id: user._id,
      avatar: user.avatar
    },
    text: msg.text,
    created_at: Date.now(),
    read_at: null,
    chat_conversation_id: msg.chat_conversation_id,
    deleted: false,
    archived: false
  };

  return await ChatMessage.save(chatMessage);
};

exports.getChatMessage = async function(id) {
  const msg = await ChatMessage.findOne({ _id: id });
  if (!msg) {
    throw `No chatMessage with id ${id}`;
  }
  return msg;
};

exports.editChatMessage = function(msg, cb) {
  ChatMessage.findOneAndUpdate(
    { _id: msg._id },
    msg,
    { upsert: false, new: true },
    cb
  );
};

exports.getMessagesByConversationAndUserId = async (conversationId, userId) => {
  const query = {
    chat_conversation_id: conversationId,
    removed: { $ne: userId }
  };

  const options = { sort: { created_at: -1 } };

  return await ChatMessage.find(query, null, options);
};

exports.deleteChatMessage = async msg => {
  const query = { _id: msg._id };
  const options = { upsert: false, new: true };

  msg.deleted = true;
  return await ChatMessage.findOneAndUpdate(query, msg, options);
};

exports.setMessageRead = async msg => {
  const query = { _id: msg._id };
  const options = { upsert: false, new: true };

  msg.read_at = Date.now();
  return await ChatMessage.findOneAndUpdate(query, msg, options);
};
