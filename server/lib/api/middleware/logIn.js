'use strict';

const FootballUserInfo = require('../models/football_user_info.js');
const FootballTeam = require('../models/football_team.js');
const extractProfileData = require ('../utils/extractProfileData.js');

exports = async (user, error, res, req, next) => {
  if (error || !user) {
    const error_message = user ? 'An Error occured' : 'No such user';
    const error = new Error(error_message);
    return next(error);
  }

  try {
    const userData = JSON.parse(entities.decode(JSON.stringify(user)));

    // Obtaining more user information to keep in the JWT
    switch (userData.user_type) {
      case 'football_team':
        FootballTeam.findOne({_id: userData.profile_id})
          .populate('current_season')
          .exec((err, res) => extractProfileData(err, res, userData));
        break;
      default:
        FootballUserInfo.findOne({_id: userData.profile_id})
          .populate('current_season')
          .exec((err, res) => extractProfileData(err, res, userData));
    }

    next();
  } catch (error) {
    return next(error);
  }
};