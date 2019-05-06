const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FootballSeasonSchema = new Schema({
  name: String,
  external_ids: {
    crawler: Number,
  },
});

FootballSeasonSchema.statics = require('../api/services/football/season');

module.exports = mongoose.model('football_season', FootballSeasonSchema);
