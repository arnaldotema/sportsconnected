var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FootballUserInfoSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'football_user'},
    type: {type: Number, required: true, index: true},
    followers: [{type: Schema.Types.ObjectId, ref: 'football_user_info'}],
    current_season: {type: Schema.Types.ObjectId, ref: 'football_user_info_season'},
    previous_seasons: [{type: Schema.Types.ObjectId, ref: 'football_user_info_season'}],
    skill_set: [
        {
            name: {type: String},
            avatar: String,
            endorsements: [{type: Schema.Types.ObjectId, ref: 'football_user_info'}],
        }
    ],
    recommendations: {
        list: [{type: Schema.Types.ObjectId, ref: 'football_user_info'}],
        top_5: [
            {
                author: {
                    name: String,
                    relationship: String,
                    id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
                    avatar: String,
                    team: {
                        id: {type: Schema.Types.ObjectId, ref: 'football_team'},
                        acronym: String,
                        avatar: String,
                        name: String,
                    },
                },
                text: String
            }
        ],
    },
    achievements: [
        {
            id: {type: Schema.Types.ObjectId, ref: 'football_achievement'},
            name: String,
            avatar: String
        }
    ],
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    external_ids: {
        zerozero: {type: Number, required: true, unique: true, index: true},
    }
});

FootballUserInfoSchema.statics = require('../services/football_user_info_service');

module.exports = mongoose.model('football_user_info', FootballUserInfoSchema);

