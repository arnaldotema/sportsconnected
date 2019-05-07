"use strict";

const mongoose = require("mongoose");
const ChatConversation = require("./../../../models/chat_conversation");

const createBulkChatConversation = function(userIds, participants, cb) {
  let convParticipants = [];

  participants.forEach(participant => {
    convParticipants.push({
      name: participant.name,
      info_id: participant._id,
      avatar: participant.avatar
    });
  });

  userIds.forEach(userId => {
    let chatConversation = {
      user_id: userId,
      participants: convParticipants,
      lastMessage: [],
      removed: false,
      created_at: Date.now(),
      updated_at_: Date.now()
    };

    ChatConversation.save(chatConversation, function(err, conv) {
      if (err) {
        return cb(err);
      }
      return cb(null, conv);
    });
  });
};

exports.createChatConversation = function(userId, participants, cb) {
  createBulkChatConversation([userId], participants, cb);
};

exports.showChatConversation = function(id) {
  ChatConversation.findOne({ _id: id }, function(err, conversation) {
    if (err) {
      return cb(err);
    }
    if (!conversation) {
      return cb("No such chatConversation");
    }
    return cb(null, conversation);
  });
};

exports.loadConversationsByUserId = function(userId) {
  ChatConversation.find(
    {
      where: {
        participants: mongoose.Types.ObjectId(userId)
      },
      removed: { $ne: userId }
    },
    function(err, conversations) {
      if (err) {
        return cb(err);
      }
      if (!conversations) {
        return cb("No such chatConversation");
      }
      return cb(null, conversations);
    }
  );
};

exports.editChatConversation = function(conv, cb) {
  ChatConversation.findOneAndUpdate(
    { _id: conv._id },
    conv,
    { upsert: false, new: true },
    cb
  );
};

exports.deleteChatConversation = function(conv, cb) {
  conv.deleted = true;
  ChatConversation.findOneAndUpdate(
    { _id: conv._id },
    conv,
    { upsert: false, new: true },
    cb
  );
};
