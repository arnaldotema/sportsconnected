var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var FootballMatchSchema = new Schema({
	external_ids: {
		zerozero: Number
	},
	date : Date,
	duration : Number,
	phase: String,
	stadium: String,
	referee: String,
	competition: {
		name: String,
		id: String,
		external_ids:{
			zerozero: Number
		}
	},
	home_team : {
		main_lineup:[
			{
                name: String,
                id: String,
                external_ids:{
                    zerozero: Number
                },
                number: Number,
                goals: [Number],
                assists: [Number],
                yellow_cards: [Number],
                red_cards: [Number],
                minutes_played: Number,
                go_in:[Number],
                go_out:[Number]
			}
		],
		reserves:[
            {
                name: String,
				id: String,
				external_ids:{
                	zerozero: Number
				},
                number: Number,
                goals: [Number],
                assists: [Number],
                yellow_cards: [Number],
                red_cards: [Number],
                minutes_played: Number,
                go_in:[Number],
                go_out:[Number]
            }
		],
		coach:{
			name: String,
			id: String,
			external_ids:{
				zerozero: Number
			}
		}
	},
	away_team : {
        main_lineup:[
            {
                name: String,
                id: String,
                external_ids:{
                    zerozero: Number
                },
                number: Number,
                goals: [Number],
                assists: [Number],
                yellow_cards: [Number],
                red_cards: [Number],
                minutes_played: Number,
                go_in:[Number],
                go_out:[Number]
            }
        ],
        reserves:[
            {
                name: String,
                id: String,
                external_ids:{
                    zerozero: Number
                },
                number: Number,
                goals: [Number],
                assists: [Number],
                yellow_cards: [Number],
                red_cards: [Number],
                minutes_played: Number,
                go_in:[Number],
                go_out:[Number]
            }
        ],
        coach:{
            name: String,
            id: String,
            external_ids:{
                zerozero: Number
            }
        }
    }
});

FootballMatchSchema.statics = require('../services/football_match_service');

module.exports = mongoose.model('football_match', FootballMatchSchema);
