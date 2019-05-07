"use strict";

const ChatMessage = require("./../../../models/chat_message");

exports.createChatMessage = function(user, msg, cb) {
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

  ChatMessage.save(chatMessage, function(err, msg) {
    if (err) {
      return cb(err);
    }
    return cb(null, msg);
  });
};

exports.showChatMessage = function(id) {
  ChatMessage.findOne({ _id: id }, function(err, message) {
    if (err) {
      return cb(err);
    }
    if (!message) {
      return cb("No such chatMessage");
    }
    return cb(null, message);
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

exports.loadMessagesByConversationAndUserId = function(conversationId, userId) {
  ChatMessage.find(
    {
      chat_conversation_id: conversationId,
      removed: { $ne: userId }
    },
    null,
    { sort: { time_created: -1 } },
    function(err, chatMessages) {
      if (err) {
        return cb(err);
      }
      if (!chatMessages) {
        return cb("No messages for such chatConversationId");
      }
      return cb(null, chatMessages);
    }
  );
};

exports.deleteChatMessage = function(msg, cb) {
  msg.deleted = true;
  ChatMessage.findOneAndUpdate(
    { _id: msg._id },
    msg,
    { upsert: false, new: true },
    cb
  );
};
