var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatConversationSchema = new Schema({
    participants: [{
        name: String,
        info_id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
        avatar: String,
    }],
    lastMessage: [{
        sender: {
            name: String,
            avatar: String
        },
        text: String,
        time_created: Date
    }],
    removed : [{type: Schema.Types.ObjectId, ref: 'football_user_info'}],
    created_at: Date,
    updated_at: Date
});

ChatConversationSchema.statics = require('../services/chat_conversation_service');

module.exports = mongoose.model('chat_conversation', ChatConversationSchema);
