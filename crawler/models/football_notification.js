const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const USER_TYPES = require("../constants/values.js").footballUserTypes;

const FootballNotificationSchema = new Schema({
  author: {
    _id: String,
    user_type: { type: String, enum: USER_TYPES },
    name: String,
    avatar: String
  },
  link: String,
  title: String,
  text: String,
  date: Date,
  media: {
    _id: { type: Schema.Types.ObjectId, ref: "football_media" },
    avatar: String
  }
});

module.exports = mongoose.model(
  "football_notification",
  FootballNotificationSchema
);
