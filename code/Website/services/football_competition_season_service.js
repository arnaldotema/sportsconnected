var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var footballCompetition = require('../models/football_competition');

const addTeamToCompetition = function(id, team, cb) {
    query = {
        "_id": id,
        "current_season.standings.id": { $ne: team._id }
    };

    update = {
        $addToSet: { "current_season.standings": {
                id: team._id,
                name: team.name,
                avatar: team.avatar
            }
        }
    }

    this.findOneAndUpdate(query, update, { setDefaultsOnInsert: true }, cb);
};

const addUserInfoToCompetition = function(id, user_info, cb) {
    query = {
        "_id": id,
        "current_season.stats.id": { $ne: user_info._id }
    };

    update = {
        $addToSet: { "current_season.stats": {
                id: user_info._id,
                name: user_info.personal_info.name,
                avatar: user_info.personal_info.avatar
            }
        }
    }

    this.findOneAndUpdate(query, update, { setDefaultsOnInsert: true }, cb);
};

const updateAndReturnByZeroZeroId = function(zerozero_id, competition, cb) {
    const query = {"external_ids.zerozero": zerozero_id};

    this.findOneAndUpdate(query, competition, { upsert:true, new:true, setDefaultsOnInsert: true }, cb);
}

module.exports = {
    addTeamToCompetition: addTeamToCompetition,
    addUserInfoToCompetition: addUserInfoToCompetition,
    updateAndReturnByZeroZeroId: updateAndReturnByZeroZeroId
}