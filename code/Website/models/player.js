var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
        personal_info: {
            name: { type: String, default: Date.now },
            avatar: { type: Date, default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg/600px-Default_profile_picture_%28male%29_on_Facebook.jpg' },
            full_name: String,
            positions: [String],
            height: Number,
            weight: Number,
            date_of_birth: Date,
            foot: String,
            created_at: { type: Date, default: Date.now },
            updated_at: { type: Date, default: Date.now }
        },
        external_ids: {
            zerozero: String,
        },
        team: {
            id: { type: Schema.Types.ObjectId, ref: 'Team' },
            acronym: String,
            avatar: String,
            name: String,
            full_name: String
        },
        current_season: {
            id: { type: Schema.Types.ObjectId, ref: 'Season' },
            name: String,
            stats: {
                games: { type: Number, default: 0 },
                goals: { type: Number, default: 0 },
                yellow_cards: { type: Number, default: 0 },
                red_cards: { type: Number, default: 0 },
                minutes_played: { type: Number, default: 0 },
            }
        },
        media: [
            {
                title: { type: String, required: true },
                author: String,
                date: Date,
                image: String,
                text: { type: String, required: true },
                references: {
                    league: {
                        name: String,
                        id: {type: Schema.Types.ObjectId, ref: 'League' }
                    },
                    team: {
                        name: String,
                        id: {type: Schema.Types.ObjectId, ref: 'Team' }
                    },
                    player: {
                        name: String,
                        id: {type: Schema.Types.ObjectId, ref: 'Player' }
                    },
                }
            }
        ],
        skill_set: [
            {
                name: { type: String, required: true, unique: true},
                avatar: String,
                endorsements: [{type: Schema.Types.ObjectId, ref: 'Player' }],
            }
        ],
        recomendations: {
            list: [{type: Schema.Types.ObjectId, ref: 'Player' }],
            top_5: [
                {
                    author: {
                        name: String,
                        id: {type: Schema.Types.ObjectId, ref: 'Player', required: true },
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
        }
    }),

    module
.
exports = mongoose.model('Player', PlayerSchema);
