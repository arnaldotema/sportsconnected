let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let FootballMediaSchema = new Schema(
    {
        user_info_id: {type: Schema.Types.ObjectId, ref: 'football_user_info', required: true},
        season_id: {type: Schema.Types.ObjectId, ref: 'football_season'},
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
);

FootballMediaSchema.statics = require('../services/football_media_service');

module.exports = mongoose.model('football_recommendation', FootballMediaSchema);
