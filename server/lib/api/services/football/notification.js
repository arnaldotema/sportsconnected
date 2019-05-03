'use strict';

exports.createNotification = function (notification, cb) {
  this.create(
    notification,
    { upsert: true, new: true, setDefaultsOnInsert: true },
    cb
  );
};

exports.getAll = function (cb) {
  this.find({}, cb);
};

exports.update = function (id, notification, cb) {
  this.findOneAndUpdate(
    { _id: id },
    notification,
    { upsert: true, new: true, setDefaultsOnInsert: true },
    cb
  );
};
