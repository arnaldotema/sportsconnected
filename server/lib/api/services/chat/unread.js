'use strict';

exports.createUnreadMessage = function(userId, msgId, cb) {
  let chatMessage = {
    user_id: userId,
    chat_message_id: msgId,
  };

  this.save(chatMessage, function(err, msg) {
    if (err) {
      return cb(err);
    }
    return cb(null, msg);
  });
};

exports.showUnreadMessagesByUser = function(id) {
  this.find({ user_id: id }, function(err, message) {
    if (err) {
      return cb(err);
    }
    if (!message) {
      return cb('No such chatMessage');
    }
    return cb(null, message);
  });
};

exports.removeUnreadMessage = function(msgID, cb) {
  this.findByIdAndRemove(msgID, function(err, message) {
    if (err) return cb(err);
    if (!message) return cb('No such chatMessage');
    return cb(null, message);
  });
};
