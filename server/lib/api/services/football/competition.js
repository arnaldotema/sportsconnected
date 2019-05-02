'use strict';

exports.updateAndReturnByZeroZeroId = function(zerozero_id, competition, cb) {
  const query = { 'external_ids.zerozero': zerozero_id };

  this.findOneAndUpdate(
    query,
    competition,
    { upsert: true, new: true, setDefaultsOnInsert: true },
    cb
  );
};