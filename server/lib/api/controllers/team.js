"use strict";

const TeamModel = require("../../models/football_team.js");
const TeamSeasonModel = require("../../models/football_team_season");
const FootballMedia = require("../../models/football_media");
const FootballRecommendation = require("../../models/football_recommendation");
const teamService = require("../../api/services/football/team");

const Entities = require("html-entities").AllHtmlEntities;
const entities = new Entities();

const { ObjectId } = require("mongoose").mongo;

const format = require("./../../utils/formatModel");

function handleError(
  err,
  result,
  successCode,
  res,
  errorCode = 500,
  errorMessage = "Error from the API."
) {
  if (err) {
    console.log(err, "There was a problem starting the server");
    return res.status(errorCode).json({
      message: errorMessage,
      error: err
    });
  }
  if (!result) {
    return res.status(404).json({
      message: "No such object"
    });
  }

  return res.status(successCode).json(format(result));
}

/**
 * team.js
 *
 * @description :: Server-side logic for managing Teams.
 */
module.exports = {
  search: function(req, res) {
    let select = {
      _id: 1,
      user_info_id: 1,
      personal_info: 1,
      team: 1,
      stats: 1
    };

    let query = {};

    req.body.query.forEach(function(filter) {
      query[filter.search_item] = {};
      query[filter.search_item][filter.selected_filter] = filter.selected_value;

      if (filter.selected_filter === "$regex") {
        query[filter.search_item]["$options"] = "i";
      }
    });

    TeamModel.find(query)
      .select(select)
      .exec(function(err, teams) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting teams.",
            error: err
          });
        }
        return res.json(JSON.parse(entities.decode(JSON.stringify(teams))));
      });
  },

  list: function(req, res) {
    TeamModel.find()
      .populate("current_season")
      .populate("previous_seasons", "standings")
      .limit(5)
      .exec(function(err, Teams) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting Team.",
            error: err
          });
        }
        return res.json(JSON.parse(entities.decode(JSON.stringify(Teams))));
      });
  },

  show: function(req, res) {
    const id = req.params.id;
    TeamModel.findOne({ _id: id })
      //.populate("current_season")
      .populate({
        path: "current_season",
        model: "football_team_season",
        select: { __v: 0, team_id: 0, _id: 0 }
      })
      .populate("previous_seasons", "standings")
      .exec((err, result) => handleError(err, result, 200, res));
  },

  players: function(req, res) {
    const id = req.params.id;
    TeamSeasonModel.findOne({ _id: id }).exec(function(err, Team) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Team.",
          error: err
        });
      }
      if (!Team) {
        return res.status(404).json({
          message: "No such Team"
        });
      }
      return res.json(
        JSON.parse(entities.decode(JSON.stringify(Team.players)))
      );
    });
  },

  create: function(req, res) {
    const team = new TeamModel(req.body);

    team.created_at = Date.now();
    team.updated_at = Date.now();

    team.save((err, result) => handleError(err, result, 201, res));
  },

  update: function(req, res) {
    const id = req.params.id;
    const query = { _id: req.body.current_season._id };

    if (!query._id) {
      query._id = new ObjectId();
    }

    const currentSeason = req.body.current_season;
    currentSeason.team_id = id;

    TeamSeasonModel.findOneAndUpdate(
      query,
      currentSeason,
      { upsert: true, new: true, setDefaultsOnInsert: true },
      (err, teamSeason) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: `Error when updating the teamSeason of team ${id}`,
            error: err
          });
        }
        if (!teamSeason) {
          return res.status(404).json({
            message: `No teamSeason with ID ${req.body.current_season._id}`
          });
        }

        const updatedTeam = req.body;

        updatedTeam.user_id = req.body.user_id || updatedTeam.user_id;
        updatedTeam.name = req.body.name || updatedTeam.name;
        updatedTeam.admins = req.body.admins || updatedTeam.admins;
        updatedTeam.update_at = Date.now();
        updatedTeam.current_season = teamSeason._id;

        TeamModel.findOneAndUpdate(
          { _id: id },
          updatedTeam,
          { upsert: true, new: true, setDefaultsOnInsert: true },
          (err, result) => handleError(err, result, 200, res)
        );
      }
    );
  },

  remove: function(req, res) {
    const id = req.params.id;
    TeamModel.findByIdAndRemove(id, function(err, team) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the team.",
          error: err
        });
      }
      return res.status(204).json();
    });
  },

  // Media

  listMedia: function(req, res) {
    let id = req.params.id;

    let offset = parseInt(req.query.offset || "0");
    let size = parseInt(req.query.size || "100");

    FootballMedia.find()
      .where("team_id")
      .equals(id)
      .skip(offset * size)
      .limit(size)
      .exec(function(err, media) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting media.",
            error: err
          });
        }
        return res.json(JSON.parse(entities.decode(JSON.stringify(media))));
      });
  },

  showMedia: function(req, res) {
    let id = req.params.id;

    FootballMedia.findOne({ _id: id })
      .where("team_id")
      .equals(id)
      .exec(function(err, media) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting media.",
            error: err
          });
        }
        return res.json(JSON.parse(entities.decode(JSON.stringify(media))));
      });
  },

  createMedia: async (req, res) => {
    const teamId = req.params.id;
    const media = req.body.media;

    if (!media) {
      return res.status(404).json({
        message: "Missing media object"
      });
    }

    media.user_info_id = teamId;
    media.created_at = Date.now();
    media.updated_at = Date.now();

    const newMedia = new FootballMedia(media);

    newMedia.save(async function(err, createdMedia) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating media",
          error: err
        });
      }

      const teamSeason = await teamService.addMedia(teamId, createdMedia);

      if (!teamSeason) {
        return res.status(404).json({
          message: "Team Season not found when adding media."
        });
      }

      handleError(null, createdMedia, 201, res);
    });
  },

  updateMedia: function(req, res) {
    let mediaId = req.params.mediaId;
    let media = req.body.media;

    if (!media) {
      return res.status(404).json({
        message: "Missing media object"
      });
    }

    FootballMedia.update(mediaId, media, (err, media) => {
      if (err) {
        return res.status(500).json({
          message: "Error when getting media.",
          error: err
        });
      }
      return res.json(JSON.parse(entities.decode(JSON.stringify(media))));
    });
  },

  removeMedia: function(req, res) {
    let mediaId = req.params.mediaId;

    FootballMedia.findByIdAndRemove(mediaId, err => {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the media.",
          error: err
        });
      }
      return res.status(204).json();
    });
  },

  // Recommendation

  listRecommendations: async (req, res) => {
    const offset = parseInt(req.query.offset || "0");
    const size = parseInt(req.query.size || "10");

    TeamModel.findOne({ _id: id })
      .populate("current_season")
      .populate("previous_seasons", "stats")
      .skip(offset * size)
      .limit(size)
      .exec((err, user_info) => handleError(err, user_info, res));
  },

  createRecommendation: async (req, res) => {
    const teamId = req.params.id;

    const recommendation = req.body.recommendation;

    if (!recommendation) {
      return res.status(404).json({
        message: "Missing recommendation object"
      });
    }

    recommendation.user_id = teamId;
    recommendation.created_at = Date.now();
    recommendation.updated_at = Date.now();

    const newRecommendation = new FootballRecommendation(recommendation);

    newRecommendation.save(async (err, createdRecommendation) => {
      if (err) {
        console.log(err, "There was a problem starting the server");
        return res.status(500).json({
          message: "Error when saving recommendation.",
          error: err
        });
      }

      const team = await teamService.addRecommendation(
        createdRecommendation,
        teamId
      );

      if (!team) {
        return res.status(404).json({
          message: "Team not found when adding recommendation."
        });
      }

      if (team.actions_regex) {
        await teamService.updateRecommendationRegex(
          team._id,
          team.actions_regex
        );
      }

      handleError(null, createdRecommendation, 201, res);
    });
  }
};
