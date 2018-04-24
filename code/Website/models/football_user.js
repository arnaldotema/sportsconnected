var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var FootballUserSchema = new Schema({
	email : { type: String, required: true, unique: true},
	password : { type: String, required: true },
	last_login : Date,
	subscription_expiration : Date,
	player : { type: Schema.Types.ObjectId, ref: 'FootballUserInfo' }
});

module.exports = mongoose.model('FootballUser', FootballUserSchema);
