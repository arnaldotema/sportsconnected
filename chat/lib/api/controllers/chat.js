"use strict";

const conversationService = require("../../api/services/conversation");
const messageService = require("../../api/services/message");
const unreadMessageService = require("../../api/services/unread");

const Entities = require("html-entities").AllHtmlEntities;
const entities = new Entities();

const validate = require("../middleware/validate");

exports.getMessage = async (req, res) => {
  const msg = await messageService.getChatMessage(req.params.messageId);
  return res.json(JSON.parse(entities.decode(JSON.stringify(msg))));
};

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

exports.getUnreadMessagesByUserId = async (req, res) => {
  const msgs = await unreadMessageService.getUnreadMessagesByUser(
    req.params.userInfoId
  );
  return res.json(JSON.parse(entities.decode(JSON.stringify(msgs))));
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

exports.createMessage = async (req, res) => {
  validate.message(req.body);
  const message = await messageService.createChatMessage(req.body);
  return res.status(201).json(message);
};

exports.createConversation = async (req, res) => {
  //validate.conversation(req.body);
  const participants = req.body.participants;
  const conversation = await conversationService.createConversation(
    participants
  );
  return res.status(201).json(conversation);
};

exports.editMessage = async (req, res) => {
  validate.message(req.body);
  const messageId = req.query.messageId;
  const message = await messageService.editChatMessage(messageId, req.body);
  return res.status(201).json(message);
};

exports.editConversation = async (req, res) => {
  validate.message(req.body);
  const conversation = await conversationService.editConversation(req.body);
  return res.status(201).json(conversation);
};

exports.deleteMessage = async (req, res) => {
  // messageService.deleteChatMessage(req.params.messageId);
};

exports.ping = (req, res) => {
  return res.status(200).json({
    message: "pong"
  });
};
