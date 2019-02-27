'use strict';


function createNotification(notification, cb) {
    this.create(notification, { upsert:true, new:true, setDefaultsOnInsert: true }, cb);
}

function getAll(cb) {
    this.find({}, cb);
}

function update(id, notification, cb) {
    this.findOneAndUpdate({_id: id}, notification, {upsert: true, new: true, setDefaultsOnInsert: true}, cb);
}

module.exports = {
    update,
    getAll,
    createNotification
};