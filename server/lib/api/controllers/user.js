const FootballUser = require("../../models/football_user.js");

/**
 * user.js
 *
 * @description :: Server-side logic for managing Users.
 */

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

exports.list = function(req, res) {
  FootballUser.find().exec((err, result) => handleError(err, result, 200, res));
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
  FootballUser.findOne({ _id: id }, function(err, user) {
    if (err) {
      return res.status(500).json({
        message: "Error when getting User",
        error: err
      });
    }
    if (!user) {
      return res.status(404).json({
        message: "No such User"
      });
    }

    // upsert logic
    user.email = req.body.email ? req.body.email : user.email;
    user.password = req.body.password ? req.body.password : user.password;
    user.last_login = req.body.last_login
      ? req.body.last_login
      : user.last_login;
    user.subscription_expiration = req.body.subscription_expiration
      ? req.body.subscription_expiration
      : user.subscription_expiration;
    user.profile_id = req.body.profile_id ? req.profile_id : user.profile_id;
    user.user_type = req.body.user_type ? req.body.user_type : user.user_type;

    user.save((err, result) => handleError(err, result, 200, res));
  });
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
