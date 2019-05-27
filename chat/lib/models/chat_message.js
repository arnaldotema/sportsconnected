const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const USER_TYPES = require("../constants/values.js").footballUserTypes;

const MessageSchema = new Schema({
  sender: {
    _id: String,
    name: String,
    user_type: { type: String, enum: USER_TYPES },
    avatar: String
  },
  text: String,
  created_at: Date,
  read_at: Date,
  chat_conversation_id: {
    type: Schema.Types.ObjectId,
    ref: "chat_conversation",
    required: true
  },
  deleted: [{ type: Schema.Types.ObjectId, ref: "football_user_info" }],
  archived: [{ type: Schema.Types.ObjectId, ref: "football_user_info" }]
});

module.exports = mongoose.model("chat_message", MessageSchema);
