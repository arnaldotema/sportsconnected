"use strict";

const TeamSeason = require("../../../models/football_team_season");
const Team = require("../../../models/football_team");

function _updateRegex(regex) {
  if (!regex) {
    regex = "##";
  }

  regex = regex.slice(0, -1); // remove the last character "#"

  regex += "!"; //close game partition

  return regex + "#"; //close regex
}

exports.updateByZeroZeroId = function(zerozeroId, userInfo, cb) {
  const query = { "external_ids.zerozero": zerozeroId };

  Team.findOneAndUpdate(
    query,
    userInfo,
    { upsert: true, new: true, setDefaultsOnInsert: true },
    cb
  );
};

exports.updateCurrentSeasons = function(seasons, cb) {
  let operations = [];

  seasons.forEach(function(season) {
    let team_season = season._doc;

    operations.push({
      updateOne: {
        filter: {
          _id: team_season.team_id
        },
        update: {
          $set: {
            current_season: team_season._id
          }
        }
      }
    });
  });

  Team.bulkWrite(operations, {}, cb);
};

exports.addMedia = async function(id, media) {
  const query = {
    team_id: id,
    season_id: media.season_id
  };

  const update = {
    $push: {
      media: media
    }
  };

  return await TeamSeason.findOneAndUpdate(query, update);
};

exports.updateRecommendationRegex = async function(userId, actionsRegex) {
  const update = {
    $set: {
      actions_regex: _updateRegex(actionsRegex)
    }
  };

  return await UserInfo.findOneAndUpdate({ _id: userId }, update, {
    upsert: true
  });
};

exports.addRecommendation = async function(recommendation, teamId) {
  const update = {
    $push: {
      "recommendations.list": recommendation._id,
      "recommendations.top_5": recommendation
    }
  };

  return await Team.findOneAndUpdate({ _id: teamId }, update);
};

exports.editRecommendation = function(recommendation, user_info_id, cb) {};

exports.deleteRecommendation = function(recommendation, user_info_id, cb) {};
