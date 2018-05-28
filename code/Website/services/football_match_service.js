const logger = require('../logging');
const _ = require('underscore');

module.exports = {
    getMissingMatches: function(matchIds, cb) {
        return this.find({ "external_ids.zerozero":{ '$in': matchIds }}, function (err, matches) {
            if (matches && !err) {
                matches = _.difference(matchIds, matches.map(match => match.external_ids.zerozero))
            }
            cb(err, matches);
        });
    }
}
