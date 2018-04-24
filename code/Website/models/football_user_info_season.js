var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FootballUserSeasonSchema = new Schema({
    season_id: {type: Schema.Types.ObjectId, ref: 'FootballSeason'},
    name: String,
    team: {
        id: {type: Schema.Types.ObjectId, ref: 'FootballTeam'},
        acronym: String,
        avatar: String,
        name: String,
        full_name: String
    },
    stats: {
        games: {type: Number, default: 0},
        goals: {type: Number, default: 0},
        yellow_cards: {type: Number, default: 0},
        red_cards: {type: Number, default: 0},
        minutes_played: {type: Number, default: 0},
    },
    games: [{type: Schema.Types.ObjectId, ref: 'FootballMatch'}]
});

module.exports = mongoose.model('FootballUserInfoSeason', FootballUserSeasonSchema);

