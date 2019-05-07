'use strict';

const Competition = require('./../../../models/football_competition');

exports.updateAndReturnByZeroZeroId = function(zerozero_id, competition, cb) {
  const query = { 'external_ids.zerozero': zerozero_id };

  Competition.findOneAndUpdate(
    query,
    competition,
    { upsert: true, new: true, setDefaultsOnInsert: true },
    cb
  );
};