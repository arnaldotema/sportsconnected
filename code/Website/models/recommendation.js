let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let RecommendationSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
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
});

RecommendationSchema.statics = require('../services/recommendation_service');

module.exports = mongoose.model('recommendation', RecommendationSchema);
