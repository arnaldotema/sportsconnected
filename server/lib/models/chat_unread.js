const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'football_user' },
  chat_message_id: {
    type: Schema.Types.ObjectId,
    ref: 'chat_message',
    required: true,
  },
});

module.exports = mongoose.model('chat_unread', MessageSchema);
