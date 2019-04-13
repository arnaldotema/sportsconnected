let Service = {};

Service.createChatMessage = function (user, msg, cb) {

    let chatMessage = {
        sender: {
            name: user.name,
            info_id: user._id,
            avatar: user.avatar,
        },
        text: msg.text,
        time_created: Date.now(),
        chat_conversation_id: msg.chat_conversation_id,
        deleted: false,
        archived: false
    };

    this.save(chatMessage, function (err, msg) {
        if (err) {
            return cb(err)
        }
        return cb(null, msg);
    });
};

Service.showChatMessage = function (id) {
    this.findOne({_id: id}, function (err, message) {
        if (err) {
            return cb(err);
        }
        if (!message) {
            return cb('No such chatMessage');
        }
        return cb(null, message);
    });
};

Service.editChatMessage = function (msg, cb) {
    this.findOneAndUpdate({"_id": msg._id}, msg, {upsert: false, new: true}, cb);
};

Service.loadMessagesByConversationAndUserId = function (conversationId, userId) {

    this.find({
        chat_conversation_id: conversationId,
        removed: {"$ne": userId}
    }, null, {sort: {time_created: -1}}, function (err, chatMessages) {
        if (err) {
            return cb(err);
        }
        if (!chatMessages) {
            return cb('No messages for such chatConversationId');
        }
        return cb(null, chatMessages);
    });
};

Service.deleteChatMessage = function (msg, cb) {
    msg.deleted = true;
    this.findOneAndUpdate({"_id": msg._id}, msg, {upsert: false, new: true}, cb);
};
module.exports = Service;