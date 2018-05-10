const logger = require('../logging');
const _ = require('underscore');

module.exports = {
    getMissingTeams: function(teamIds, cb) {
        return this.find({ "external_ids.zerozero":{ '$in': teamIds }}, function (err, teams) {
            if (teams && !err) {
                teams = _.difference(teamIds, teams.map(team => team.external_ids.zerozero))
            }
            cb(err, teams);
        });
    }
}
