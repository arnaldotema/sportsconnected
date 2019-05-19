"use strict";

const ChatUnread = require("../../models/chat_unread");

exports.createUnreadMessage = (userId, msgId, cb) => {
  let chatMessage = {
    user_id: userId,
    chat_message_id: msgId
  };

  this.save(chatMessage, (err, msg) => {
    if (err) {
      return cb(err);
    }
    return cb(null, msg);
  });
};

exports.getUnreadMessagesByUser = async id => {
  await ChatUnread.find({ user_id: id }, (err, message) => {
    if (err) throw err;
    return message;
  });
};

exports.removeUnreadMessage = (msgID, cb) => {
  ChatUnread.findByIdAndRemove(msgID, (err, message) => {
    if (err) return cb(err);
    if (!message) return cb(`No chatMessage with id ${msgID}`);
    return cb(null, message);
  });
};
