const logger = require('../logging');
const _ = require('underscore');

const addCompetitionToUserInfo = function(id, competition, cb) {
    let query = {
        _id: id,
        "current_season.stats.id": { $ne: competition._id }
    };

    let update = {
        $addToSet: { "current_season.stats": {
                id: competition._id,
                name: competition.name,
                avatar: competition.avatar,
            }
        }
    };

    this.findOneAndUpdate(query, update, { setDefaultsOnInsert: true }, cb);
};

const getMatchUserInfosByZeroZeroId = function(homeTeam, awayTeam, cb) {
    let query = [
        {
            $facet: {
                home_team: [
                    {
                        $match: {
                            "external_ids.zerozero": { "$in": homeTeam.main_lineup }
                        }
                    }
                ],
                home_team_reserves: [
                    {
                        $match: {
                            "external_ids.zerozero": { "$in": homeTeam.reserves }
                        }
                    }
                ],
                home_team_staff: [
                    {
                        $match: {
                            "external_ids.zerozero": { "$in": homeTeam.staff }
                        }
                    }
                ],
                away_team: [
                    {
                        $match: {
                            "external_ids.zerozero": { "$in": awayTeam.main_lineup }
                        }
                    }
                ],
                away_team_reserves: [
                    {
                        $match: {
                            "external_ids.zerozero": { "$in": awayTeam.reserves }
                        }
                    }
                ],
                away_team_staff: [
                    {
                        $match: {
                            "external_ids.zerozero": { "$in": awayTeam.staff }
                        }
                    }
                ]
            }
        }
    ];

    this.aggregate(query, cb)
};

module.exports = {
    addCompetitionToUserInfo: addCompetitionToUserInfo,
    getMatchUserInfosByZeroZeroId: getMatchUserInfosByZeroZeroId
}
