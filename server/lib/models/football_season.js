const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FootballSeasonSchema = new Schema({
  name: String,
  updated_at: Date,
  external_ids: {
    zerozero: Number
  }
});

module.exports = mongoose.model("football_season", FootballSeasonSchema);
