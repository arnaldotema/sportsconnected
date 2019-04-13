var FootballUser = require('../models/football_user.js');
var FootballUserInfo = require('../models/football_user_info.js');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const jwt = require('jsonwebtoken');



/**
 * user_controller.js
 *
 * @description :: Server-side logic for managing Users.
 */
let Service = {};

function handleError(err, result, res) {
    if (err) {
        return res.status(500).json({
            message: 'Error from the API.',
            error: err
        });
    }
    if (!result) {
        return res.status(404).json({
            message: 'No such object'
        });
    }
    return res.json(JSON.parse(entities.decode(JSON.stringify(result))));
}

// User

Service.list = function (req, res) {
    FootballUser.find()
        .exec((err, result) => handleError(err, result, res));
};

Service.show = function (req, res) {
    let id = req.params.id;
    FootballUser.findOne({_id: id})
        .exec((err, result) => handleError(err, result, res));
};

Service.create = function (req, res) {
    let User = new FootballUser({
        email: req.body.email,
        password: req.body.password,
        last_login: req.body.last_login,
        subscription_expiration: req.body.subscription_expiration,
        profile_id: req.body.profile_id,
        user_type: req.body.user_type
    });

    User.save(function (err, User) {
        if (err) {
            return res.status(500).json({
                message: 'Error when creating User',
                error: err
            });
        }
        return res.status(201).json(User);
    });
};

Service.update = function (req, res) {
    let id = req.params.id;
    FootballUser.findOne({_id: id}, function (err, User) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting User',
                error: err
            });
        }
        if (!User) {
            return res.status(404).json({
                message: 'No such User'
            });
        }

        User.email = req.body.email ? req.body.email : User.email;
        User.password = req.body.password ? req.body.password : User.password;
        User.last_login = req.body.last_login ? req.body.last_login : User.last_login;
        User.subscription_expiration = req.body.subscription_expiration ? req.body.subscription_expiration : User.subscription_expiration;
        User.profile_id = req.body.profile_id ? req.profile_id : User.profile_id;
        User.user_type = req.body.user_type ? req.body.user_type : User.user_type;

        User.save(function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating User.',
                    error: err
                });
            }

            return res.json(User);
        });
    });
};

Service.remove = function (req, res) {
    var id = req.params.id;
    FootballUser.findByIdAndRemove(id, function (err, User) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the User.',
                error: err
            });
        }
        return res.status(204).json();
    });
};

module.exports = Service;