var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var TeamSchema = new Schema({
	user_id : { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	name : { type: String, required: true, unique: true},
	admins : [
			{ type: Schema.Types.ObjectId, ref: 'User' }
		]
});

module.exports = mongoose.model('Team', TeamSchema);
