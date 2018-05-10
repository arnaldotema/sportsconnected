var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var FootballCompetitionSeasonSchema = new Schema({
	name : String,
	current_season: {
        matchdays : Array,
        standings : Array,
        stats : Array
	}
});

module.exports = mongoose.model('football_competition_season', FootballCompetitionSeasonSchema);
