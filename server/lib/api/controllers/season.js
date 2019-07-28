const FootballSeason = require("../../models/football_season.js");

/**
 * user.js
 *
 * @description :: Server-side logic for managing Users.
 */

const handleError = require("./../../utils/handleApiResponse");

exports.list = function(req, res) {
  const offset = parseInt(req.query.offset || "0");
  const size = parseInt(req.query.size || "25");

  FootballSeason.find()
    .skip(offset * size)
    .limit(size)
    .exec((err, result) => handleError(err, result, 200, res));
};

exports.show = function(req, res) {
  const id = req.params.id;
  FootballSeason.findOne({ _id: id }).exec((err, result) =>
    handleError(err, result, 200, res)
  );
};

exports.create = function(req, res) {
  const season = new FootballSeason({
    ...req.body,
    updated_at: req.body.updated_at || Date.now()
  });

  season.save((err, result) => {
    handleError(err, result, 201, res);
  });
};

exports.update = function(req, res) {
  const id = req.params.id;
  const season = req.body;

  season.updated_at = Date.now();

  FootballSeason.findOneAndUpdate(
    { _id: id },
    { $set: season },
    { upsert: true, new: true },
    (err, result) => {
      handleError(err, result, 200, res);
    }
  );
};

exports.remove = function(req, res) {
  const id = req.params.id;
  FootballSeason.findByIdAndRemove(id).exec((err, result) => {
    handleError(err, result, 204, res);
  });
};
