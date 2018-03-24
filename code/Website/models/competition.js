var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CompetitionSchema = new Schema({
	'name' : String,
	'editions' : [
		{
			'year': Number,
			'start_date': Date
		}
	],
	'matchdays' : Array,
	'standings' : Array,
	'stats' : Array
});

module.exports = mongoose.model('Competition', CompetitionSchema);
