var UserModel = require('../models/football_user.js');
var FootballUserInfo = require('../models/football_user_info.js');
var FootballUser = require('../models/football_user.js');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const jwt = require('jsonwebtoken');


let Service = {};


Service.signup = function (req, res) {
    return res.json({message: "Signed UP!"});
};

Service.aggregate_profile = function (req, res) {
    let id = req.params.id;
    let profile_id = req.body.id;
    let user_session = {}

    FootballUserInfo.findOne({_id: profile_id})
        .populate('current_season')
        .exec(function (err, user_info) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user_info',
                    error: err
                });
            }
            if (!user_info) {
                return res.status(404).json({
                    message: 'No such user_info'
                });
            }

            user_info = JSON.parse(entities.decode(JSON.stringify(user_info)));


            UserModel.findOne({_id: id})
                .exec(function (err, user) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when getting user',
                            error: err
                        });
                    }
                    if (!user) {
                        return res.status(404).json({
                            message: 'No such user'
                        });
                    }

                    // Storing the aggregated profile to the current user
                    user.profile_id = user_info._id;
                    user.user_type = user_info.current_season.team ? 'football_user_info' : 'football_team';


                    // Sending the user information based on the user aggregated profile
                    // This information will be used as session user in the front end
                    user_session.profile_id = user_info._id;
                    user_session.user_type = user_info.current_season.team ? 'football_user_info' : 'football_team';
                    user_session.avatar = user_info.current_season.personal_info.avatar;
                    user_session.name = user_info.current_season.personal_info.name;
                    user_session.team_avatar = user_info.current_season.team ? user_info.current_season.team.avatar : 'n/a';
                    user_session.team_id = user_info.current_season.team ? user_info.current_season.team._id : 'n/a';
                    user_session.team_acronym = user_info.current_season.team ? user_info.current_season.team.acronym : 'n/a';
                    user_session.team_name = user_info.current_season.team ? user_info.current_season.team.name : 'n/a';

                    user_session.token = jwt.sign({user: user_session}, 'top_secret');

                    user.save(function (err, saved_user) {
                        if (err) {
                            return res.status(500).json({
                                message: 'Error when updating user.',
                                error: err
                            });
                        }

                        // Sending the user information merged with the information from its aggregated user_info
                        return res.json(user_session);
                    });
                });

        });

};


module.exports = Service;