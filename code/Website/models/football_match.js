var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var FootballMatchSchema = new Schema({
    played: {type: Boolean, required: true, index: true},
    processed: {
      teams: Boolean,
      players: Boolean,
      competition: Boolean
    },
	external_ids: {
		zerozero: Number
	},
	date : {type: Date, required: true},
	duration : Number,
	stadium: String,
	referee: String,
	competition: {
		name: String,
        avatar: String,
		id: {type: Schema.Types.ObjectId, ref: 'football_competition'},
        phase: String,
		external_ids:{
			zerozero: Number
		}
	},
	home_team : {
        id: {type: Schema.Types.ObjectId, ref: 'football_team'},
        name: String,
        avatar: String,
        goals: [String],
		main_lineup:[
			{
                name: String,
                info_id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
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
				info_id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
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
			id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
			external_ids:{
				zerozero: Number
			}
		}
	},
	away_team : {
        id: {type: Schema.Types.ObjectId, ref: 'football_team'},
        name: String,
        avatar: String,
        goals: [String],
        main_lineup:[
            {
                name: String,
                info_id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
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
                info_id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
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
            id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
            external_ids:{
                zerozero: Number
            }
        }
    }
});

FootballMatchSchema.statics = require('../services/football_match_service');

module.exports = mongoose.model('football_match', FootballMatchSchema);
