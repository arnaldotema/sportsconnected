var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FootballUserInfoSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'football_user'},
    personal_info: {
        name: {type: String, default: Date.now},
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
        updated_at: {type: Date, default: Date.now}
    },
    external_ids: {
        zerozero: String,
    },
    current_season: {
        season_id: {type: Schema.Types.ObjectId, ref: 'football_season'},
        name: String,
        team: {
            id: {type: Schema.Types.ObjectId, ref: 'football_team'},
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
        games: [{type: Schema.Types.ObjectId, ref: 'football_match'}]
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
                player: [{
                    name: String,
                    id: {type: Schema.Types.ObjectId, ref: 'football_user_info'}
                }],
            }
        }
    ],
    skill_set: [
        {
            name: {type: String, required: true, unique: true},
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
                    id: {type: Schema.Types.ObjectId, ref: 'football_user_info', required: true},
                    avatar: String,
                    team: {
                        id: String,
                        acronym: String,
                        avatar: String,
                        name: String,
                    },
                },
                text: String,

            }
        ],
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('football_user_info', FootballUserInfoSchema);

