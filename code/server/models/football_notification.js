var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const USER_TYPES = require('../constants/values.js').football_user_types;

var FootballNotificationSchema = new Schema({
    author: {
        user_info_id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
        team_id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
        user_type: {type: String, enum: USER_TYPES},
        name: String,
        avatar: String,
    },
    link: String,
    title: String,
    text: String,
    date: Date,
    media: {
        _id: {type: Schema.Types.ObjectId, ref: 'football_media'},
        avatar: String
    }
});

FootballNotificationSchema.statics = require('../services/football_notification_service');

module.exports = mongoose.model('football_notification', FootballNotificationSchema);
