let Service = {};

Service.createChatMessageAttachment = function (user, msgAtt, cb) {

    let chatMessageAttachment = {
        sender: {
            name: user.name,
            info_id: user._id,
            avatar: user.avatar,
        },
        file: {
            path: msgAtt.file.path,
            name: msgAtt.file.name,
            type: msgAtt.file.type,
            size: msgAtt.file.size
        },
        text: msgAtt.text,
        time_created: Date.now(),
        chat_conversation_id: msgAtt.chat_conversation_id,
        deleted: false,
        archived: false
    };

    this.save(chatMessageAttachment, function (err, msg) {
        if (err) {
            return cb(err)
        }
        return cb(null, msg);
    });
};

Service.showChatMessageAttachment = function (id) {
    this.findOne({_id: id}, function (err, messageAttachment) {
        if (err) {
            return cb(err);
        }
        if (!messageAttachment) {
            return cb('No such chatMessageAttachment');
        }
        return cb(null, messageAttachment);
    });
};

Service.editChatMessageAttachment = function (msg, cb) {
    this.findOneAndUpdate({"_id": msg._id}, msg, {upsert: false, new: true}, cb);
};

Service.loadMessageAttachmentsByConversationAndUserId = function (conversationId, userId) {

    this.find({
        chat_conversation_id: conversationId,
        removed: {"$ne": userId}
    }, null, {sort: {time_created: -1}}, function (err, chatMessageAttachments) {
        if (err) {
            return cb(err);
        }
        if (!chatMessageAttachments) {
            return cb('No messageAttachments for such chatConversationId');
        }
        return cb(null, chatMessageAttachments);
    });
};

Service.deleteChatMessageAttachment = function (msg, cb) {
    msg.deleted = true;
    this.findOneAndUpdate({"_id": msg._id}, msg, {upsert: false, new: true}, cb);
};
module.exports = Service;