const logger = require('../logging');
const _ = require('underscore');

let Service = {};

Service.aggregateProfile = function (user_id, user_info_id, cb) {
    let operations = [];

    operations.push({
        updateOne: {
            filter: {
                "_id": user_id
            },
            update: {
                $push : {
                    "player": user_info_id
                }
            }
        }
    });

    this.bulkWrite(operations, {}, cb);
};

module.exports = Service;
