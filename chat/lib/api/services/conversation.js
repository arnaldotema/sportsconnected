"use strict";

const mongoose = require("mongoose");
const ChatConversation = require("../../models/chat_conversation");

exports.createConversation = async participants => {
  await participants.forEach(participant => {
    participants.push({
      name: participant.name,
      info_id: participant._id,
      avatar: participant.avatar
    });
  });

  const chatConversation = new ChatConversation({
    participants: participants,
    lastMessage: [],
    removed: [],
    created_at: Date.now(),
    updated_at: Date.now()
  });

  return await chatConversation.save();
};

exports.getConversationByIdAndUserId = async (id, userId) => {
  await ChatConversation.findOne(
    { _id: id, participants: mongoose.Types.ObjectId(userId) },
    (err, conversation) => {
      if (!conversation) {
        throw "No such chatConversation";
      }
      return conversation;
    }
  );
};

exports.getParticipantsByConversationId = async id => {
  const conv = await ChatConversation.findOne({ _id: id });
  return conv.participants || [];
};

exports.getConversationByUserId = async userId =>
  (await ChatConversation.find({
    where: {
      participants: mongoose.Types.ObjectId(userId),
      removed: { $ne: userId }
    }
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
