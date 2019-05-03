'use strict';

exports.createAchievement = function(achievement, cb) {
  this.create(
    achievement,
    { upsert: true, new: true, setDefaultsOnInsert: true },
    cb
  );
};

exports.getAll = function(cb) {
  this.find({}, cb);
};

exports.addUserInfoToAchievement = function(user_info, achievement, cb) {
  const query = {
    _id: achievement._id,
    bearers: { $ne: user_info._id },
  };

  const update = {
    $push: {
      bearers: user_info._id,
    },
  };

  this.findOneAndUpdate(query, update, cb);
};
