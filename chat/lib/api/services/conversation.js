"use strict";

const mongoose = require("mongoose");
const ChatConversation = require("../../models/chat_conversation");

exports.createConversation = async conversation => {
  let participants = [];

  await conversation.participants.forEach(participant => {
    participants.push({
      name: participant.name,
      info_id: participant._id,
      avatar: participant.avatar
    });
  });

  let chatConversation = {
    user_id: conversation.userId,
    participants: participants,
    lastMessage: [],
    removed: false,
    created_at: Date.now(),
    updated_at: Date.now()
  };

  return await ChatConversation.save(chatConversation);
};

exports.getConversationByIdAndUserId = async (id, userId) => {
  await ChatConversation.findOne(
    { _id: id, user_id: userId },
    (err, conversation) => {
      if (!conversation) {
        throw "No such chatConversation";
      }
      return conversation;
    }
  );
};

exports.getConversationByUserId = async userId =>
  (await ChatConversation.find({
    where: {
      participants: mongoose.Types.ObjectId(userId)
    },
    removed: { $ne: userId }
  })) || null;

exports.editConversation = async conv =>
  await ChatConversation.findOneAndUpdate({ _id: conv._id }, conv, {
    upsert: false,
    new: true
  });

exports.deleteConversation = async conv => {
  conv.deleted = true;
  await ChatConversation.findOneAndUpdate({ _id: conv._id }, conv, {
    upsert: false,
    new: true
  });
};
