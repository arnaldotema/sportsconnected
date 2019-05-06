const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FootballCompetitionSchema = new Schema({
  name: String,
  avatar: String,
  current_season: {
    type: Schema.Types.ObjectId,
    ref: 'football_competition_season',
  },
  previous_seasons: [
    { type: Schema.Types.ObjectId, ref: 'football_competition_season' },
  ],
  external_ids: {
    crawler: { type: Number, required: true, unique: true, index: true },
  },
});

FootballCompetitionSchema.statics = require('../api/services/football/competition');

module.exports = mongoose.model(
  'football_competition',
  FootballCompetitionSchema
);
