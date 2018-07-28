const logger = require('../logging');
const _ = require('underscore');

const updateAndReturnByZeroZeroId = function(zerozero_id, user_info, cb) {
    const query = {"external_ids.zerozero": zerozero_id};

    this.findOneAndUpdate(query, user_info, { upsert:true, new:true, setDefaultsOnInsert: true }, cb);
};

const updateUserInfosCurrentSeason = function (seasons, cb) {
    let operations = [];

    seasons.forEach(function(season){
        let user_info_season = season._doc;

        operations.push({
            updateOne: {
                filter: {
                    "_id": user_info_season.user_info_id
                },
                update: {
                    $set : {
                        "current_season": user_info_season._id
                    },
                    $push : {
                        "previous_seasons": user_info_season._id
                    }
                }
            }
        });
    });

    this.bulkWrite(operations, {}, cb);
}

module.exports = {
    updateAndReturnByZeroZeroId: updateAndReturnByZeroZeroId,
    updateUserInfosCurrentSeason: updateUserInfosCurrentSeason
}
