const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { footballUserTypes } = require("../constants/values.js");

const FootballTeamSeasonSchema = new Schema({
  team_id: { type: Schema.Types.ObjectId, ref: "football_team" },
  season_id: { type: Schema.Types.ObjectId, ref: "football_season" },
  standings: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "football_competition_season" },
      competition_id: {
        type: Schema.Types.ObjectId,
        ref: "football_competition"
      },
      name: String,
      avatar: String,
      position: { type: Number, default: 0 },
      matches: { type: Number, default: 0 },
      wins: { type: Number, default: 0 },
      draws: { type: Number, default: 0 },
      losses: { type: Number, default: 0 },
      goals: { type: Number, default: 0 },
      goals_taken: { type: Number, default: 0 }
    }
  ],
  matches: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "football_match" },
      date: Date,
      competition_season: {
        id: { type: Schema.Types.ObjectId, ref: "football_competition_season" },
        competition_id: {
          type: Schema.Types.ObjectId,
          ref: "football_competition"
        },
        name: String,
        avatar: String
      },
      home_team: {
        id: { type: Schema.Types.ObjectId, ref: "football_team_season" },
        team_id: { type: Schema.Types.ObjectId, ref: "football_team" },
        name: String,
        avatar: String,
        goals: Number
      },
      away_team: {
        id: { type: Schema.Types.ObjectId, ref: "football_team_season" },
        team_id: { type: Schema.Types.ObjectId, ref: "football_team" },
        name: String,
        avatar: String,
        goals: Number
      }
    }
  ],
  players: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "football_user_info_season" },
      user_info_id: { type: Schema.Types.ObjectId, ref: "football_user_info" },
      age: Number,
      number: Number,
      name: String,
      avatar: String,
      nationality: String,
      positions: [String]
    }
  ],
  staff: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "football_user_info_season" },
      user_info_id: { type: Schema.Types.ObjectId, ref: "football_user_info" },
      name: String,
      avatar: String,
      nationality: String
    }
  ],
  media: [
    {
      _id: String,
      user_type: { type: String, enum: footballUserTypes },
      season_id: { type: Schema.Types.ObjectId, ref: "football_season" },
      title: { type: String },
      author: {
        name: String,
        id: String,
        user_type: { type: String, enum: footballUserTypes },
        avatar: String,
        team: {
          id: { type: Schema.Types.ObjectId, ref: "football_team" },
          acronym: String,
          avatar: String,
          name: String
        }
      },
      date: Date,
      image: String,
      text: { type: String },
      tags: [String]
    }
  ],
  external_ids: {
    zerozero: { type: Number, required: true, index: true }
  }
});

module.exports = mongoose.model(
  "football_team_season",
  FootballTeamSeasonSchema
);
