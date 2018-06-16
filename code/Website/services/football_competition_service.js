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
                avatar: team.avatar,
            }
        }
    }

    this.findOneAndUpdate(query, update, { upsert:true, new:true, setDefaultsOnInsert: true }, cb);
};

module.exports = {
    addTeamToCompetition: addTeamToCompetition
}