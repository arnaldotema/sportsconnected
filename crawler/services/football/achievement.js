"use strict";

const Achievement = require("./../../models/football_achievement");

exports.createAchievement = function(achievement, cb) {
  Achievement.create(
    achievement,
    { upsert: true, new: true, setDefaultsOnInsert: true },
    cb
  );
};

exports.getAll = function(cb) {
  Achievement.find({}, cb);
};

exports.addUserInfoToAchievement = function(user_info, achievement, cb) {
  const query = {
    _id: achievement._id,
    bearers: { $ne: user_info._id }
  };

  const update = {
    $push: {
      bearers: user_info._id
    }
  };

  Achievement.findOneAndUpdate(query, update, cb);
};
