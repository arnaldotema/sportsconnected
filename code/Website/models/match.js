var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var MatchSchema = new Schema({
	'start_date' : Date,
	'duration' : Number,
	'home_team' : Array,
	'away_team' : Array
});

module.exports = mongoose.model('match', MatchSchema);
