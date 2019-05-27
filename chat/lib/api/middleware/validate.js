"use strict";

const messageSchema = require("../../schemas/chat_message");
const unreadSchema = require("../../schemas/chat_unread");
const attachmentSchema = require("../../schemas/chat_attachment");
const conversationSchema = require("../../schemas/chat_conversation");
const Ajv = require("ajv");
const ajvKeywords = require("ajv-keywords");
const ajv = new Ajv({ useDefaults: true });

ajvKeywords(ajv);

exports.message = msg => {
  const validate = ajv.compile(messageSchema);
  if (validate(msg)) {
    return;
  }
  const [{ dataPath, message }] = validate.errors;
  throw `Chat message${dataPath} ${message}`;
};

exports.unread = unread => {
  const validate = ajv.compile(unreadSchema);
  if (validate(unread)) {
    return;
  }
  const [{ dataPath, message }] = validate.errors;
  throw `Chat unread${dataPath} ${message}`;
};

exports.conversation = conversation => {
  const validate = ajv.compile(conversationSchema);
  if (validate(conversation)) {
    return;
  }
  const [{ dataPath, message }] = validate.errors;
  throw `Chat conversation${dataPath} ${message}`;
};

exports.attachment = attachment => {
  const validate = ajv.compile(attachmentSchema);
  if (validate(attachment)) {
    return;
  }
  const [{ dataPath, message }] = validate.errors;
  throw `Chat attachment${dataPath} ${message}`;
};
