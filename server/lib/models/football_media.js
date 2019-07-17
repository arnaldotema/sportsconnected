const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const USER_TYPES = require("../constants/values.js").footballUserTypes;

const FootballMediaSchema = new Schema({
  user_type: { type: String, enum: USER_TYPES },
  season_id: {
    type: Schema.Types.ObjectId,
    ref: "football_season",
    required: true
  },
  user_info_id: String,
  title: { type: String, required: true },
  author: {
    name: String,
    id: String,
    user_type: { type: String, enum: USER_TYPES },
    avatar: String,
    team: {
      id: { type: Schema.Types.ObjectId, ref: "football_team" },
      acronym: String,
      avatar: String,
      name: String
    }
  },
  date: Date,
  image: String,
  text: { type: String, required: true },
  tags: [String],
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model("football_media", FootballMediaSchema);
