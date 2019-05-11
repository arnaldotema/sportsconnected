const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const USER_TYPES = require("../constants/values.js").footballUserTypes;

const ChatConversationSchema = new Schema({
  user_id: String,
  participants: [
    {
      name: String,
      _id: String,
      user_type: { type: String, enum: USER_TYPES },
      avatar: String
    }
  ],
  lastMessage: [
    {
      sender: {
        name: String,
        avatar: String
      },
      text: String,
      time_created: Date
    }
  ],
  removed: [{ type: Schema.Types.ObjectId, ref: "football_user_info" }],
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model("chat_conversation", ChatConversationSchema);
