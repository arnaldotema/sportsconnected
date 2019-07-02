"use strict";

const FootballUserInfo = require("../../models/football_user_info.js");
const FootballTeam = require("../../models/football_team.js");
const extractProfileData = require("../../utils/extractProfileData.js");

const logIn = async (user, error, next) => {
  if (error) {
    return next(error);
  }

  try {
    const userData = JSON.parse(entities.decode(JSON.stringify(user)));

    // Obtaining more user information to keep in the JWT
    switch (userData.user_type) {
      case "football_team":
        FootballTeam.findOne({ _id: userData.profile_id })
          .populate("current_season")
          .exec((err, res) => extractProfileData(err, res, userData));
        break;
      default:
        FootballUserInfo.findOne({ _id: userData.profile_id })
          .populate("current_season")
          .exec((err, res) => extractProfileData(err, res, userData));
    }
    next();
  } catch (error) {
    return next(error);
  }
};
