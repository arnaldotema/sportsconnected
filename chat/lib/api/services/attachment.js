"use strict";

const ChatAttachment = require("../../models/chat_attachment");

exports.createChatMessageAttachment = function(user, msgAtt, cb) {
  let chatMessageAttachment = {
    sender: {
      name: user.name,
      info_id: user._id,
      avatar: user.avatar
    },
    file: {
      path: msgAtt.file.path,
      name: msgAtt.file.name,
      type: msgAtt.file.type,
      size: msgAtt.file.size
    },
    text: msgAtt.text,
    time_created: Date.now(),
    chat_conversation_id: msgAtt.chat_conversation_id,
    deleted: false,
    archived: false
  };

  ChatAttachment.save(chatMessageAttachment, function(err, msg) {
    if (err) {
      return cb(err);
    }
    return cb(null, msg);
  });
};

exports.showChatMessageAttachment = function(id) {
  ChatAttachment.findOne({ _id: id }, function(err, messageAttachment) {
    if (err) {
      return cb(err);
    }
    if (!messageAttachment) {
      return cb("No such chatMessageAttachment");
    }
    return cb(null, messageAttachment);
  });
};

exports.editChatMessageAttachment = function(msg, cb) {
  ChatAttachment.findOneAndUpdate(
    { _id: msg._id },
    msg,
    { upsert: false, new: true },
    cb
  );
};

exports.loadMessageAttachmentsByConversationAndUserId = function(
  conversationId,
  userId
) {
  ChatAttachment.find(
    {
      chat_conversation_id: conversationId,
      removed: { $ne: userId }
    },
    null,
    { sort: { time_created: -1 } },
    function(err, chatMessageAttachments) {
      if (err) {
        return cb(err);
      }
      if (!chatMessageAttachments) {
        return cb("No messageAttachments for such chatConversationId");
      }
      return cb(null, chatMessageAttachments);
    }
  );
};

exports.deleteChatMessageAttachment = function(msg, cb) {
  msg.deleted = true;
  ChatAttachment.findOneAndUpdate(
    { _id: msg._id },
    msg,
    { upsert: false, new: true },
    cb
  );
};
