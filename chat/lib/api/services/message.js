"use strict";

const ChatMessage = require("../../models/chat_message");

exports.createChatMessage = async function(user, msg, cb) {
  let chatMessage = {
    sender: {
      name: user.name,
      info_id: user._id,
      avatar: user.avatar
    },
    text: msg.text,
    time_created: Date.now(),
    chat_conversation_id: msg.chat_conversation_id,
    deleted: false,
    archived: false
  };

  ChatMessage.save(chatMessage, async function(err, msg) {
    if (err) {
      return cb(err);
    }
    return cb(null, msg);
  });
};

exports.getChatMessage = async function(id) {
  await ChatMessage.findOne({ _id: id }, (err, message) => {
    if (err) {
      throw err;
    }
    if (!message) {
      throw `No chatMessage with id ${id}`;
    }
    return message;
  });
};

exports.editChatMessage = function(msg, cb) {
  ChatMessage.findOneAndUpdate(
    { _id: msg._id },
    msg,
    { upsert: false, new: true },
    cb
  );
};

exports.getMessagesByConversationAndUserId = async function(
  conversationId,
  userId
) {
  ChatMessage.find(
    {
      chat_conversation_id: conversationId,
      removed: { $ne: userId }
    },
    null,
    { sort: { time_created: -1 } },
    function(err, chatMessages) {
      if (err) {
        throw err;
      }
      return chatMessages;
    }
  );
};

exports.deleteChatMessage = async function(msg, cb) {
  msg.deleted = true;
  ChatMessage.findOneAndUpdate(
    { _id: msg._id },
    msg,
    { upsert: false, new: true },
    cb
  );
};
