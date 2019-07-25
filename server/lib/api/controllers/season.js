const FootballSeason = require("../../models/football_season.js");
const Entities = require("html-entities").AllHtmlEntities;
const entities = new Entities();

/**
 * user.js
 *
 * @description :: Server-side logic for managing Users.
 */

const handleError = require("./../../utils/handleApiResponse");

exports.list = function(req, res) {
  FootballSeason.find().exec((err, result) => handleError(err, result, res));
};

exports.show = function(req, res) {
  let id = req.params.id;
  FootballSeason.findOne({ _id: id }).exec((err, result) =>
    handleError(err, result, 200, res)
  );
};

exports.create = function(req, res) {
  const season = new FootballSeason({
    ...req.body,
    updated_at: req.body.updated_at || Date.now()
  });

  season.save(function(err, Season) {
    if (err) {
      return res.status(500).json({
        message: "Error when creating Season",
        error: err
      });
    }
    return res.status(201).json(Season);
  });
};

exports.update = function(req, res) {
  let id = req.params.id;
  FootballSeason.findOne({ _id: id }, function(err, season) {
    if (err) {
      return res.status(500).json({
        message: "Error when getting season",
        error: err
      });
    }
    if (!season) {
      return res.status(404).json({
        message: "No such season"
      });
    }

    season.name = req.body.name || season.name;
    season.updated_at = req.body.updated_at || season.updated_at;
    season.external_ids = req.body.last_login || season.external_ids;

    season.save((err, season) => {
      if (err) {
        return res.status(500).json({
          message: "Error when updating season.",
          error: err
        });
      }

      return res.json(season);
    });
  });
};

exports.remove = function(req, res) {
  const id = req.params.id;
  FootballSeason.findByIdAndRemove(id, function(err, Season) {
    if (err) {
      return res.status(500).json({
        message: "Error when deleting the Season.",
        error: err
      });
    }
    return res.status(204).json();
  });
};
