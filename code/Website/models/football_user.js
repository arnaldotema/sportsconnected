var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var FootballUserSchema = new Schema({
	email : { type: String, required: true, unique: true},
	password : { type: String, required: true },
	last_login : Date,
	subscription_expiration : Date,
	player : { type: Schema.Types.ObjectId, ref: 'football_user_info' }
});

module.exports = mongoose.model('football_user', FootballUserSchema);
