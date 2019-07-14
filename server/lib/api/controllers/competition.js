const CompetitionModel = require("../../models/football_competition.js");
const CompetitionSeasonModel = require("../../models/football_competition_season");
const Entities = require("html-entities").AllHtmlEntities;
const entities = new Entities();

const format = require("./../../utils/formatModel");

function handleError(err, result, successCode, res) {
  if (err) {
    return res.status(500).json({
      message: "Error from the API.",
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
 * competition.js
 *
 * @description :: Server-side logic for managing Competitions.
 */
module.exports = {
  /**
   * CompetitionController.list()
   */
  list: function(req, res) {
    CompetitionSeasonModel.find()
      .select({
        standings: 0,
        matches: 0,
        stats: 0
      })
      .populate("current_season")
      .populate("previous_seasons", "stats")
      .exec(function(err, Competitions) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting Competition.",
            error: err
          });
        }
        return res.json(
          JSON.parse(entities.decode(JSON.stringify(Competitions)))
        );
      });
  },

  /**
   * CompetitionController.show()
   */
  show: function(req, res) {
    const id = req.params.id;
    CompetitionSeasonModel.findOne({ _id: id }, function(err, Competition) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Competition.",
          error: err
        });
      }
      if (!Competition) {
        return res.status(404).json({
          message: "No such Competition"
        });
      }
      return res.json(JSON.parse(entities.decode(JSON.stringify(Competition))));
    });
  },

  /**
   * CompetitionController.create()
   */
  create: function(req, res) {
    var object = {};

    Object.keys(CompetitionModel.schema.obj).forEach(function(key) {
      object[key] = req.body[key];
    });

    object.created_at = Date.now();
    object.updated_at = Date.now();

    const competition = new CompetitionModel(object);

    competition.save((err, result) => handleError(err, result, 201, res));
  },

  /**
   * CompetitionController.update()
   */
  update: function(req, res) {
    // Todo:
    // This is wrongly implemented in terms of sintax
    // Because the received ID could be easily mistaken for the Competition ID when
    // in actuality its the CompetitionSeason ID.

    const id = req.params.id;
    CompetitionSeasonModel.findOne({ _id: id }, function(err, competition) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting competition",
          error: err
        });
      }
      if (!competition) {
        return res.status(404).json({
          message: "No such competition"
        });
      }

      Object.keys(CompetitionModel.schema.obj).forEach(function(key) {
        competition[key] = req.body[key] ? req.body[key] : competition[key];
      });

      competition.updated_at = Date.now();

      competition.save(function(err, Competition) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating competition.",
            error: err
          });
        }

        return res.json(Competition);
      });
    });
  },

  /**
   * CompetitionController.remove()
   */
  remove: function(req, res) {
    const id = req.params.id;
    CompetitionSeasonModel.findByIdAndRemove(id, function(err, Competition) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the Competition.",
          error: err
        });
      }
      return res.status(204).json();
    });
  },

  teams: function(req, res) {
    const id = req.params.id;
    CompetitionSeasonModel.findOne({ _id: id }).exec(function(
      err,
      Competition
    ) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Competition.",
          error: err
        });
      }
      if (!Competition) {
        return res.status(404).json({
          message: "No such Competition"
        });
      }
      return res.json(
        JSON.parse(entities.decode(JSON.stringify(Competition.standings)))
      );
    });
  }
};
