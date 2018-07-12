const logger = require('../logging');
const _ = require('underscore');

const getMissingMatches = function(matchIds, cb) {
    return this.find({ "external_ids.zerozero":{ '$in': matchIds }}, function (err, matches) {
        if (matches && !err) {
            matches = _.difference(matchIds, matches.map(match => match.external_ids.zerozero))
        }
        cb(err, matches);
    });
}

const initializeMatch = function(match, cb) {
    const query = {"external_ids.zerozero": res.options.zerozeroId};

    return this.findOneAndUpdate(query, match, { upsert:true, new:true, setDefaultsOnInsert: true }, cb);
}

module.exports = {
    getMissingMatches: getMissingMatches,
    initializeMatch: initializeMatch
}
