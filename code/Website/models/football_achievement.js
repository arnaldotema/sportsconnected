var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var FootballAchievementSchema = new Schema({
	name : String
});

//FootballAchievementSchema.statics = require('../services/football_achievement_service');

module.exports = mongoose.model('football_achievement', FootballAchievementSchema);
