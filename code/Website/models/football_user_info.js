var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FootballUserInfoSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'football_user'},
    type: {type: Number, required: true, index: true},
    personal_info: {
        name: String,
        avatar: {
            type: String,
            default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg/600px-Default_profile_picture_%28male%29_on_Facebook.jpg'
        },
        full_name: String,
        positions: [String],
        height: Number,
        weight: Number,
        date_of_birth: Date,
        foot: String,
        nationality: String,
        updated_at: {type: Date, default: Date.now}
    },
    external_ids: {
        zerozero: {type: Number, required: true, unique: true, index: true},
    },
    current_season: {
        season_id: {type: Schema.Types.ObjectId, ref: 'football_season'},
        name: String,
        team: {
            id: {type: Schema.Types.ObjectId, ref: 'football_team'},
            acronym: String,
            avatar: String,
            name: String
        },
        stats: [{
            id: {type: Schema.Types.ObjectId, ref: 'football_competition'},
            name: String,
            avatar: String,
            games: {type: Number, default: 0},
            goals: {type: Number, default: 0},
            assists: {type: Number, default: 0},
            yellow_cards: {type: Number, default: 0},
            red_cards: {type: Number, default: 0},
            minutes_played: {type: Number, default: 0}
        }],
        matches: [{
            id: {type: Schema.Types.ObjectId, ref: 'football_match'},
            date: Date,
            competition:{
                id: {type: Schema.Types.ObjectId, ref: 'football_competition'},
                name: String,
                avatar: String
            },
            home_team: {
                id: {type: Schema.Types.ObjectId, ref: 'football_team'},
                name: String,
                avatar: String,
                goals: Number
            },
            away_team: {
                id: {type: Schema.Types.ObjectId, ref: 'football_team'},
                name: String,
                avatar: String,
                goals: Number
            }
        }]
    },
    previous_seasons: [{type: Schema.Types.ObjectId, ref: 'football_user_info_season'}],
    media: [
        {
            title: {type: String, required: true},
            author: String,
            date: Date,
            image: String,
            text: {type: String, required: true},
            references: {
                leagues: [{
                    name: String,
                    id: {type: Schema.Types.ObjectId, ref: 'football_competition'}
                }],
                team: [{
                    name: String,
                    id: {type: Schema.Types.ObjectId, ref: 'football_team'}
                }],
                user: [{
                    name: String,
                    id: {type: Schema.Types.ObjectId, ref: 'football_user_info'}
                }],
            }
        }
    ],
    skill_set: [
        {
            name: {type: String},
            avatar: String,
            endorsements: [{type: Schema.Types.ObjectId, ref: 'football_user_info'}],
        }
    ],
    recomendations: {
        list: [{type: Schema.Types.ObjectId, ref: 'football_user_info'}],
        top_5: [
            {
                author: {
                    name: String,
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
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

FootballUserInfoSchema.statics = require('../services/football_user_info_service');

module.exports = mongoose.model('football_user_info', FootballUserInfoSchema);

