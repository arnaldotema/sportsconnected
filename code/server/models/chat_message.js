var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    sender: {
        name: String,
        info_id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
        avatar: String,
    },
    text: String,
    time_created: Date,
    conversation_id: {type: Schema.Types.ObjectId, ref: 'chat_conversation', required: true},
    deleted: {type: Boolean, required: true, index: true},
    archived: {type: Boolean, required: true, index: true}
});

MessageSchema.statics = require('../services/chat_message_service');

module.exports = mongoose.model('chat_message', MessageSchema);
