let Service = {};

Service.createUnreadMessage = function (userId, msgId, cb) {

    let chatMessage = {
        user_id: userId,
        chat_message_id: msgId
    };

    this.save(chatMessage, function (err, msg) {
        if (err) {
            return cb(err)
        }
        return cb(null, msg);
    });
};

Service.showUnreadMessagesByUser = function (id) {
    this.find({user_id: id}, function (err, message) {
        if (err) {
            return cb(err);
        }
        if (!message) {
            return cb('No such chatMessage');
        }
        return cb(null, message);
    });
};

Service.removeUnreadMessage = function (msgID, cb) {
    this.findByIdAndRemove(msgID, function (err, message) {
        if (err)
            return cb(err);
        if (!message)
            return cb('No such chatMessage');
        return cb(null, message);
    });
};
module.exports = Service;