var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatMessageSchema = new Schema({
    sender: {
        name: String,
        info_id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
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
