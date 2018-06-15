const logger = require('../logging');
const _ = require('underscore');

const getMissingTeams = function(teamIds, cb) {
    return this.find({ "external_ids.zerozero":{ '$in': teamIds }}, function (err, teams) {
        if (teams && !err) {
            teams = _.difference(teamIds, teams.map(team => team.external_ids.zerozero))
        }
        cb(err, teams);
    });
};

const addCompetitionToTeam = function(id, competition, cb) {
    let query = {
        _id: id,
        "current_season.standings.id": { $ne: competition._id }
    };

    let update = {
        $addToSet: { "current_season.standings": {
                id: competition._id,
                name: competition.name,
                avatar: competition.avatar,
            }
        }
    };

    this.findOneAndUpdate(query, update, { upsert:true, new:true, setDefaultsOnInsert: true }, cb);
};

module.exports = {
    getMissingTeams: getMissingTeams,
    addCompetitionToTeam: addCompetitionToTeam,
}
