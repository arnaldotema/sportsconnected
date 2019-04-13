const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const USER_TYPES = require('../constants/values.js').football_user_types;

var ChatMessageSchema = new Schema({
    sender: {
        name: String,
        _id: String,
        user_type: {type: String, enum: USER_TYPES},
        avatar: String,
    },
    file: {
        path: String,
        name: String,
        type: String,
        size: String
    },
    time_created: Date,
    chat_conversation_id: {type: Schema.Types.ObjectId, ref: 'chat_conversation'},
    text: String,
    deleted: {type: Boolean, required: true, index: true},
    archived: {type: Boolean, required: true, index: true}
});

ChatMessageSchema.statics = require('../services/chat_attachment_service');

module.exports = mongoose.model('chat_attachment', ChatMessageSchema);
