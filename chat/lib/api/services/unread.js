"use strict";

const ChatUnread = require("../../models/chat_unread");

exports.createUnreadMessage = async (userId, msgId) => {
  let chatMessage = {
    user_id: userId,
    chat_message_id: msgId
  };

  return await this.save(chatMessage);
};

exports.getUnreadMessagesByUser = async id =>
  await ChatUnread.find({ user_id: id });

exports.removeUnreadMessage = async (userId, msgID) =>
  await ChatUnread.findOneAndRemove({
    user_id: userId,
    chat_message_id: msgID
  });
