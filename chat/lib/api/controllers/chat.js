"use strict";

const conversationService = require("../../api/services/conversation");
const messageService = require("../../api/services/message");
const unreadMessageService = require("../../api/services/unread");

const Entities = require("html-entities").AllHtmlEntities;
const entities = new Entities();

exports.getConversationsByUserId = async (req, res) => {
  const userId = req.params.userId;

  const conversations = await conversationService.getConversationByUserId(
    userId
  );

  await conversations.map(async c => {
    const messages = await messageService.getMessagesByConversationAndUserId(
      c._id,
      userId
    );
    return { ...c, messages };
  });

  const body = JSON.parse(entities.decode(JSON.stringify(conversations)));

  return res.status(200).json(body);
};

exports.createConversation = async (req, res) => {
  const conversation = await conversationService.createConversation(req.body);
  return res.status(201).json(conversation);
};

exports.createMessage = async (req, res) => {
  const message = await conversationService.createConversation(req.body);
  return res.status(201).json(message);
};

exports.getMessage = async (req, res) => {
  const msg = await messageService.getChatMessage(req.params.messageId);
  return res.json(JSON.parse(entities.decode(JSON.stringify(msg))));
};

exports.getUnreadMessagesByUserId = async (req, res) => {
  const msgs = await unreadMessageService.getUnreadMessagesByUser(
    req.params.userInfoId
  );
  return res.json(JSON.parse(entities.decode(JSON.stringify(msgs))));
};

exports.editMessage = async (req, res) => {
  const message = await conversationService.editConversation(req.body);
  return res.status(201).json(message);
};

exports.getConversationByUserAndConversationId = async (req, res) => {
  const conversationId = req.params.conversationId;
  const userId = req.params.userId;

  const messages = await messageService.getMessagesByConversationAndUserId(
    conversationId,
    userId
  );
  const conversation = await conversationService.getConversationByIdAndUserId(
    conversationId,
    userId
  );

  const body = JSON.parse(
    entities.decode(JSON.stringify({ ...conversation, messages }))
  );

  return res.status(200).json(body);
};

exports.deleteMessage = (req, res) => {
  // messageService.deleteChatMessage(req.params.messageId);
};
