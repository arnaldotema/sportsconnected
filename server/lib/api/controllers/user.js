const FootballUser = require("../../models/football_user.js");
const Entities = require("html-entities").AllHtmlEntities;
const entities = new Entities();

/**
 * user.js
 *
 * @description :: Server-side logic for managing Users.
 */

function handleError(err, result, res) {
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
  return res.json(JSON.parse(entities.decode(JSON.stringify(result))));
}

exports.list = function(req, res) {
  FootballUser.find().exec((err, result) => handleError(err, result, res));
};

exports.show = function(req, res) {
  let id = req.params.id;
  FootballUser.findOne({ _id: id }).exec((err, result) =>
    handleError(err, result, res)
  );
};

exports.create = function(req, res) {
  const user = new FootballUser({
    ...req.body,
    last_login: req.body.last_login || Date.now(),
    subscription_expiration: req.body.subscription_expiration || Date.now()
  });

  user.save(function(err, User) {
    if (err) {
      return res.status(500).json({
        message: "Error when creating User",
        error: err
      });
    }
    return res.status(201).json(User);
  });
};

exports.update = function(req, res) {
  let id = req.params.id;
  FootballUser.findOne({ _id: id }, function(err, User) {
    if (err) {
      return res.status(500).json({
        message: "Error when getting User",
        error: err
      });
    }
    if (!User) {
      return res.status(404).json({
        message: "No such User"
      });
    }

    User.email = req.body.email ? req.body.email : User.email;
    User.password = req.body.password ? req.body.password : User.password;
    User.last_login = req.body.last_login
      ? req.body.last_login
      : User.last_login;
    User.subscription_expiration = req.body.subscription_expiration
      ? req.body.subscription_expiration
      : User.subscription_expiration;
    User.profile_id = req.body.profile_id ? req.profile_id : User.profile_id;
    User.user_type = req.body.user_type ? req.body.user_type : User.user_type;

    User.save(function(err, User) {
      if (err) {
        return res.status(500).json({
          message: "Error when updating User.",
          error: err
        });
      }

      return res.json(User);
    });
  });
};

exports.remove = function(req, res) {
  const id = req.params.id;
  FootballUser.findByIdAndRemove(id, function(err, User) {
    if (err) {
      return res.status(500).json({
        message: "Error when deleting the User.",
        error: err
      });
    }
    return res.status(204).json();
  });
};
