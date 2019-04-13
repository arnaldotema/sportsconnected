const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const USER_TYPES = require('../constants/values.js').football_user_types;

var MessageSchema = new Schema({
    sender: {
        name: String,
        _id: String,
        user_type: {type: String, enum: USER_TYPES},
        avatar: String,
    },
    text: String,
    time_created: Date,
    chat_conversation_id: {type: Schema.Types.ObjectId, ref: 'chat_conversation', required: true},
    deleted: {type: Boolean, required: true, index: true},
    archived: {type: Boolean, required: true, index: true}
});

MessageSchema.statics = require('../services/chat_message_service');

module.exports = mongoose.model('chat_message', MessageSchema);
