
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
        conversation_id: msg.conversation_id,
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

Service.loadMessagesByConversationId = function (conversationId) {

    this.findOne({ "conversation_id": conversationId }, null, {sort: {time_created: -1 }}, function (err, chatMessages) {
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