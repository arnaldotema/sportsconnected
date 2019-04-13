const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'football_user'},
    chat_message_id: {type: Schema.Types.ObjectId, ref: 'chat_message', required: true}
});

MessageSchema.statics = require('../services/chat_unread_service');

module.exports = mongoose.model('chat_unread', MessageSchema);
