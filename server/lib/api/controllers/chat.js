'use strict';

const ChatMessage = require('../../models/chat_message');
const ChatConversation = require('../../models/chat_conversation');

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

exports.loadConversations = function(req, res) {
  // use conversation service to get conversations for this user
  // .then() get messages for each conversation

  let ids = req.params.id;

  ChatConversation.find({ id: { $in: ids } })
    .populate('participants')
    .exec(function(err, Competitions) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Competition.',
          error: err,
        });
      }
      return res.json(
        JSON.parse(entities.decode(JSON.stringify(Competitions)))
      );
    });
};

exports.createChatConversation = function(req, res) {
  Object.keys(ChatConversation.schema.obj).forEach(function(key) {
    object[key] = req.body[key];
  });

  let conversation = new ChatConversation(object);

  ChatConversation.createChatConversation(conversation, (err, convo) => {
    if (err) {
      return res.status(500).json({
        message: 'Error when creating ChatConversation',
        error: err,
      });
    }
    return res.status(201).json(convo);
  });
};

exports.createChatMessage = function(req, res) {
  // Todo : Is this really necessary or can we just use req.body... ?

  Object.keys(ChatMessage.schema.obj).forEach(function(key) {
    object[key] = req.body[key];
  });

  let message = new ChatMessage(object);

  ChatMessage.createChatMessage(message, (err, msg) => {
    if (err) {
      return res.status(500).json({
        message: 'Error when creating ChatMessage',
        error: err,
      });
    }
    return res.status(201).json(msg);
  });
};

exports.showChatMessage = function(req, res) {
  // use chat service
};

exports.editChatMessage = function(req, res) {
  // use chat service
};

exports.showChatConversation = function(req, res) {
  // use conversation service
};

exports.deleteChatMessage = function(req, res) {
  // use chat service
};