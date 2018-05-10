var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var FootballCompetitionSchema = new Schema({
	name : String,
	current_season: {
        matchdays : Array,
        standings : Array,
        stats : Array
	},
	previous_seasons: [{type: Schema.Types.ObjectId, ref: 'football_competition_season'}]
});

module.exports = mongoose.model('football_competition', FootballCompetitionSchema);
