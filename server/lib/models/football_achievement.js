const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FootballAchievementSchema = new Schema({
  name: String,
  avatar: String,
  bearers: [{ type: Schema.Types.ObjectId, ref: 'football_user_info' }],
  regex: String,
  regex_matches: Number,
});

FootballAchievementSchema.statics = require('../api/services/football/achievement');

module.exports = mongoose.model(
  'football_achievement',
  FootballAchievementSchema
);
