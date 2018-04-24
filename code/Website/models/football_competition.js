var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var FootballCompetitionSchema = new Schema({
	name : String,
	current_season: {
        matchdays : Array,
        standings : Array,
        stats : Array
	},
	previous_seasons: [{type: Schema.Types.ObjectId, ref: 'FootballCompetitionSeason'}]
});

module.exports = mongoose.model('FootballCompetition', FootballCompetitionSchema);
