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

module.exports = {
    addCompetitionToUserInfo: addCompetitionToUserInfo
}
