var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var FootballCompetitionSchema = new Schema({
	name : String,
	avatar: String,
	current_season: {
        standings : [
			{
				id: {type: Schema.Types.ObjectId, ref: 'football_team'},
				name: String,
				avatar: String,
				position: Number,
				points: {type: Number, default: 0},
                matches: {type: Number, default: 0},
				wins: {type: Number, default: 0},
				draws: {type: Number, default: 0},
				losses: {type: Number, default: 0},
				goals: {type: Number, default: 0},
				goals_taken: {type: Number, default: 0}
			}
		],
        stats : [
            {
                info_id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
                name: String,
                avatar: String,
                goals: {type: Number, default: 0},
                assists: {type: Number, default: 0},
                minutes: {type: Number, default: 0},
                wins: {type: Number, default: 0},
                draws: {type: Number, default: 0},
                losses: {type: Number, default: 0},
				yellow_cards: {type: Number, default: 0},
				red_cards: {type: Number, default: 0},
                goals_taken: {type: Number, default: 0}
            }
		]
	},
	previous_seasons: [{type: Schema.Types.ObjectId, ref: 'football_competition_season'}],
    external_ids: {
        zerozero: {type: Number, required: true, unique: true, index: true},
    }
});

module.exports = mongoose.model('football_competition', FootballCompetitionSchema);
