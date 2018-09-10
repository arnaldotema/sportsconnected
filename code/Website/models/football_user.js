var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
const bcrypt = require('bcrypt');

var FootballUserSchema = new Schema({
	email : { type: String, required: true, unique: true},
	password : { type: String, required: true },
	last_login : Date,
	subscription_expiration : Date,
	player : { type: Schema.Types.ObjectId, ref: 'football_user_info' }
});

//This is called a pre-hook, before the user information is saved in the database
//this function will be called, we'll get the plain text password, hash it and store it.
FootballUserSchema.pre('save', async function(next){
    const user = this;
    //Hash the password with a salt round of 12, the higher the rounds the more secure, but the slower
    //our application becomes.
    const hash = await bcrypt.hash(this.password, 12);

    this.password = hash;
    //Indicates we're done and moves on to the next middleware
    next();
});

FootballUserSchema.methods.isValidPassword = async function(password){
    const user = this;
    //Hashes the password sent by the user for login and checks if the hashed password stored in the
    //database matches the one sent. Returns true if it does else false.
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}


module.exports = mongoose.model('football_user', FootballUserSchema);
