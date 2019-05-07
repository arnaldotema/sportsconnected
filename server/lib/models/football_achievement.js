const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FootballAchievementSchema = new Schema({
  name: String,
  avatar: String,
  bearers: [{ type: Schema.Types.ObjectId, ref: 'football_user_info' }],
  regex: String,
  regex_matches: Number,
});

module.exports = mongoose.model(
  'football_achievement',
  FootballAchievementSchema
);
