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

    this.findOneAndUpdate(query, update, { setDefaultsOnInsert: true }, cb);
};

const addPlayerToTeam = function(id, user_info, cb) {
    let query = {
        _id: id,
        "current_season.players.id": { $ne: user_info._id }
    };

    let update = {
        $addToSet: { "current_season.players": {
                id: user_info._id,
                name: user_info.personal_info.name,
                avatar: user_info.personal_info.avatar,
            }
        }
    };

    this.findOneAndUpdate(query, update, { setDefaultsOnInsert: true }, cb);
};

const getMatchTeamsByZeroZeroId = function(homeTeam, awayTeam, cb) {
    let query = [
        {
            $facet: {
                home_team: [
                    {
                        $match: {
                            "external_ids.zerozero": homeTeam
                        }
                    }
                ],
                away_team: [
                    {
                        $match: {
                            "external_ids.zerozero": awayTeam
                        }
                    }
                ]
            }
        }
    ];

    this.aggregate(query, cb)
};

module.exports = {
    getMissingTeams: getMissingTeams,
    addCompetitionToTeam: addCompetitionToTeam,
    addPlayerToTeam: addPlayerToTeam,
    getMatchTeamsByZeroZeroId: getMatchTeamsByZeroZeroId
}
