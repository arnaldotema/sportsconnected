
let Service = {};

Service.createChatConversation = function (user, chatConversation, cb) {

    chatConversation.created_at = Date.now();
    chatConversation.updated_at_at = Date.now();

    this.save(chatConversation, function (err, conv) {
        if (err) {
            return cb(err)
        }
        return cb(null, conv);
    });
};

Service.showChatConversation = function (id) {
    this.findOne({_id: id}, function (err, conversation) {
        if (err) {
            return cb(err);
        }
        if (!conversation) {
            return cb('No such chatConversation');
        }
        return cb(null, conversation);
    });
};

Service.loadConversationsByUserId = function (userId) {

    this.findOne({ "removed": { "$ne": userId } }, function (err, conversation) {
        if (err) {
            return cb(err);
        }
        if (!conversation) {
            return cb('No such chatConversation');
        }
        return cb(null, conversation);
    });
};

Service.editChatConversation = function (conv, cb) {
    this.findOneAndUpdate({"_id": conv._id}, conv, {upsert: false, new: true}, cb);
};

Service.deleteChatConversation = function (conv, cb) {
    conv.deleted = true;
    this.findOneAndUpdate({"_id": conv._id}, conv, {upsert: false, new: true}, cb);
};
module.exports = Service;