let mongoose = require('mongoose');
let Schema   = mongoose.Schema;
const USER_TYPES = require('../constants/values.js').football_user_types;

/**
 *
 * Admitting that only football users can receive recommendation now.
 *
 * */

const FootballRecommendationSchema = new Schema({
    _id: String,
    user_type: {type: String, enum: USER_TYPES},
    author: {
        author_type: String,
        name: String,
        relationship: String,
        id: String, // There's no Schema reference because it can be any type of user
        avatar: String,
        team: {
            id: {type: Schema.Types.ObjectId, ref: 'football_team'},
            acronym: String,
            avatar: String,
            name: String,
        },
    },
    text: String
});

FootballRecommendationSchema.statics = require('../services/football_recommendation_service');

module.exports = mongoose.model('football_recommendation', FootballRecommendationSchema);
