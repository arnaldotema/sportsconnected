const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const USER_TYPES = require("../constants/values.js").footballUserTypes;

const FootballUserSchema = new Schema({
  profile_id: String, // This is not this schema's ID. It's a reference for either the player, team or other type document.
  user_type: { type: String, enum: USER_TYPES },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  last_login: Date,
  subscription_expiration: Date
});

FootballUserSchema.pre("save", async next => {
  const user = this;

  // TODO: Change this
  // This is checking if the password is hashed already or not.
  // We won't allow the user to pick a password bigger than 10 characters,
  // So if it's > 10 it means it's hashed
  if (user.password.length < 10) {
    //Hash the password with a salt round of 12, the higher the rounds the more secure, but the slower
    //our application becomes.
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

FootballUserSchema.methods.isValidPassword = async password => {
  const user = this;
  //Hashes the password sent by the user for login and checks if the hashed password stored in the
  //database matches the one sent. Returns true if it does else false.
  return await bcrypt.compare(password, user.password);
};

module.exports = mongoose.model("football_user", FootballUserSchema);
