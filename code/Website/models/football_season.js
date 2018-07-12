var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var FootballSeasonSchema = new Schema({
	name : String,
    external_ids: {
        zerozero: {type: Number, required: true, unique: true, index: true},
    }
});

module.exports = mongoose.model('football_season', FootballSeasonSchema);
