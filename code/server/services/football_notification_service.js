'use strict';

let Service = {};

Service.createNotification = function(notification, cb) {
    this.create(notification, { upsert:true, new:true, setDefaultsOnInsert: true }, cb);
};

Service.getAll = function (cb) {
    this.find({}, cb);
};

module.exports = Service;