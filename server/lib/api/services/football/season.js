'use strict';

exports.getSeasonByName = function(name, cb) {
  const query = {
    name: name,
  };

  this.findOneAndUpdate(
    query,
    query,
    { upsert: true, new: true, setDefaultsOnInsert: true },
    cb
  );
};