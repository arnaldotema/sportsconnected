let ChatMessage = require('../models/chat_message');
let ChatAttachment = require('../models/chat_attachment');
let ChatConversation = require('../models/chat_conversation');
let ImageStorageService = require('../services/storage/image_storage_service');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

let Service = {};

Service.loadConversations = function (req, res) {

// use conversation service to get conversations for this user
// .then() get messages for each conversation

};

Service.createChatConversation = function (req, res) {

// use conversation service
};

Service.createChatMessage = function (req, res) {

// use chat service
};

Service.showChatMessage = function (req, res) {
    // use chat service
};

Service.editChatMessage = function (req, res) {
    // use chat service
};


Service.showChatConversation = function (req, res) {
    // use conversation service
};


Service.deleteChatMessage = function (req, res) {
    // use chat service
};

module.exports = Service;