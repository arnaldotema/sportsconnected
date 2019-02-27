const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const USER_TYPES = require('../constants/values.js').football_user_types;

var FootballUserInfoSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'football_user'},
    type: {type: Number, required: true, index: true},
    followers: [{
        user_type: {type: String, enum: USER_TYPES},
        user_info_id:{type: Schema.Types.ObjectId, ref: 'football_user_info'},
        team_id:{type: Schema.Types.ObjectId, ref: 'football_team'},
        name: String,
        avatar: String
    }],
    following: [{
        user_type: {type: String, enum: USER_TYPES},
        user_info_id:{type: Schema.Types.ObjectId, ref: 'football_user_info'},
        team_id:{type: Schema.Types.ObjectId, ref: 'football_team'},
        name: String,
        avatar: String
    }],
    current_season: {type: Schema.Types.ObjectId, ref: 'football_user_info_season'},
    previous_seasons: [{type: Schema.Types.ObjectId, ref: 'football_user_info_season'}],
    skill_set: [
        {
            name: {type: String},
            endorsements: [
                {
                    user_type: {type: String, enum: USER_TYPES},
                    user_info_id:{type: Schema.Types.ObjectId, ref: 'football_user_info'},
                    team_id:{type: Schema.Types.ObjectId, ref: 'football_team'},
                    name: String,
                    avatar: String
                }
            ],
        }
    ],
    recommendations: {
        list: [{type: Schema.Types.ObjectId, ref: 'recommendation'}],
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
    actions_regex: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    external_ids: {
        zerozero: {type: Number, required: true, unique: true, index: true},
    }
});

FootballUserInfoSchema.pre('save', function (next) {
    this.updated_at = Date.now()
    next()
})


FootballUserInfoSchema.statics = require('../services/football_user_info_service');

module.exports = mongoose.model('football_user_info', FootballUserInfoSchema);

