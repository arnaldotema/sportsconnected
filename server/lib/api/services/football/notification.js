'use strict';

const Notification = require('./../../../models/football_notification');

exports.createNotification = function (notification, cb) {
  Notification.create(
    notification,
    { upsert: true, new: true, setDefaultsOnInsert: true },
    cb
  );
};

exports.getAll = function (cb) {
  Notification.find({}, cb);
};

exports.update = function (id, notification, cb) {
  Notification.findOneAndUpdate(
    { _id: id },
    notification,
    { upsert: true, new: true, setDefaultsOnInsert: true },
    cb
  );
};
