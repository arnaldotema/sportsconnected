const FootballUser = require("../../models/football_user.js");

/**
 * user.js
 *
 * @description :: Server-side logic for managing Users.
 */

const handleError = require("./../../utils/handleApiResponse");

exports.list = function(req, res) {
  const offset = parseInt(req.query.offset || "0");
  const size = parseInt(req.query.size || "25");

  FootballUser.find()
    .skip(offset * size)
    .limit(size)
    .exec((err, result) => handleError(err, result, 200, res));
};

exports.show = function(req, res) {
  let id = req.params.id;
  FootballUser.findOne({ _id: id }).exec((err, result) =>
    handleError(err, result, 200, res)
  );
};

exports.create = function(req, res) {
  const user = new FootballUser({
    ...req.body,
    last_login: Date.now(),
    subscription_expiration: Date.now()
  });

  user.save((err, result) => handleError(err, result, 201, res));
};

exports.update = function(req, res) {
  let id = req.params.id;
  const user = req.body;

  FootballUser.findOneAndUpdate(
    { _id: id },
    { $set: user },
    { upsert: true, new: true },
    (err, result) => {
      handleError(err, result, 200, res);
    }
  );
};

exports.remove = function(req, res) {
  const id = req.params.id;
  FootballUser.findByIdAndRemove(id, function(err) {
    if (err) {
      return res.status(500).json({
        message: "Error when deleting the User.",
        error: err
      });
    }
    return res.status(204).json();
  });
};
