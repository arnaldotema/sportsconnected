"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const { footballUserTypes } = require("../constants/values.js");

const FootballUserSchema = new Schema({
  profile_id: String, // This is not this schema's ID. It's a reference for either the player, team or other type document.
  user_type: { type: String, enum: footballUserTypes },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  last_login: Date,
  subscription_expiration: Date
});

FootballUserSchema.pre("save", async function(next) {
  // Maximum password length is 10 characters.
  // So if it's > 10, it means it's already hashed.
  // If it's already hashed, it means it's an update.
  // If it's an update we don't need to hashedsh the pw.

  if (this.password && this.password.length < 10) {
    //Hash the password with a salt round of 12
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

FootballUserSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this._doc.password);
};

module.exports = mongoose.model("football_user", FootballUserSchema);
