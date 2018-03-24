var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
	'email' : { type: String, required: true, unique: true},
	'password' : { type: String, required: true },
	'last_login' : Date,
	'subscription_expiration' : Date,
	'teams' : [
			{ type: Schema.Types.ObjectId, ref: 'Team' }
		],
	'player' : { type: Schema.Types.ObjectId, ref: 'Player' },
	'coach' : { type: Schema.Types.ObjectId, ref: 'Coach' }
});

module.exports = mongoose.model('User', UserSchema);
