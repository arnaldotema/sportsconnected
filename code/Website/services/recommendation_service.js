var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
let Service = {};

Service.addRecommendation = function (recommendation, user_info_id, cb) {
    let operations = [];

    operations.push({
        updateOne: {
            filter: {
                "_id": user_info_id
            },
            update: {
                $push :  {
                    "recommendations.list": recommendation
                }
            }
        }
    });

    this.bulkWrite(operations, {}, cb);
}

module.exports = Service;