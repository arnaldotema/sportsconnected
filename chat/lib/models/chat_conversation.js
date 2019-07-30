const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { footballUserTypes } = require("../constants/values.js");

const ChatConversationSchema = new Schema({
  participants: [
    {
      name: String,
      _id: String,
      user_type: { type: String, enum: footballUserTypes },
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
      created_at: Date
    }
  ],
  removed: [{ type: Schema.Types.ObjectId, ref: "football_user_info" }],
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model("chat_conversation", ChatConversationSchema);
