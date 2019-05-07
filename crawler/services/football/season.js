"use strict";

const Season = require("./../../models/football_season");

exports.getSeasonByName = function(name, cb) {
  const query = {
    name: name
  };

  Season.findOneAndUpdate(
    query,
    query,
    { upsert: true, new: true, setDefaultsOnInsert: true },
    cb
  );
};
