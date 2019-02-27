const express = require('express');
const passport = require('passport');
const FootballUserInfo = require('../models/football_user_info.js');
const FootballTeam = require('../models/football_team.js');
const router = express.Router();
const AuthController = require('../controllers/auth_controller.js');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const jwt = require('jsonwebtoken');


function loginMw(user, error, res, req, next) {

    if (error || !user) {
        let error_message = user ? 'An Error occured' : 'No such user';
        const error = new Error(error_message);
        return next(error);
    }

    try {

        // TODO: Change this
        // This implementation makes us change this code scope whenever there's a new user type.

        user = JSON.parse(entities.decode(JSON.stringify(user)));

        // Obtaining more user information to keep in the JWT

        switch (user.user_type) {
            case 'football_team' :
                FootballTeam
                    .findOne({_id: user.profile_id})
                    .populate('current_season')
                    .exec(get_profile_info);
                break;
            default :
                FootballUserInfo
                    .findOne({_id: user.profile_id})
                    .populate('current_season')
                    .exec(get_profile_info);

        }

        function get_profile_info(err, result) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting profile.',
                    error: err
                });
            }
            if (!result) {
                return res.status(404).json({
                    message: 'No such profile'
                });
            }

            let profile_info = JSON.parse(entities.decode(JSON.stringify(result)));

            // We don't want to store the sensitive information
            // such as the password in the JWT
            const body = {
                _id: user._id,
                email: user.email,
                profile_id: user.profile_id,
                user_type: user.user_type,
                avatar: profile_info.current_season.personal_info.avatar,
                name: profile_info.current_season.personal_info.name,
                team_id: profile_info.current_season.team ? profile_info.current_season.team.id : 'n/a',
                team_avatar: profile_info.current_season.team ? profile_info.current_season.team.avatar : 'n/a',
                team_acronym: profile_info.current_season.team ? profile_info.current_season.team.acronym : 'n/a',
                team_name: profile_info.current_season.team ? profile_info.current_season.team.name : 'n/a'
            };

            //Sign the JWT token and populate the payload with the user email, id and etc
            const token = jwt.sign({user: body}, 'top_secret');
            //Send back the token to the user
            return res.json({
                token: token,
                _id: body._id,
                email: body.email,
                profile_id: body.profile_id,
                user_type: body.user_type,
                avatar: body.avatar,
                name: body.name,
                team_id: body.team_id,
                team_avatar: body.team_avatar,
                team_acronym: body.team_acronym,
                team_name: body.team_name
            });
        }


    } catch (error) {
        return next(error);
    }


}

router.post('/',
    passport.authenticate('signup', {session: false}),
    async (req, res, next) => {
        let user = req._doc || req.user._doc;
        req.login(
            user,
            {session: false},
            async (error) => loginMw(user, error, res, req, next));
    });

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        req.login(
            user,
            {session: false},
            async (error) => loginMw(user, error, res, req, next));
    })(req, res, next);
});

router.post('/:id/aggregate-profile', AuthController.aggregate_profile);

module.exports = router;
