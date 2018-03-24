var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PlayerSchema = new Schema({
	'user_id' : { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
	'name' : String
});

module.exports = mongoose.model('Player', PlayerSchema);
