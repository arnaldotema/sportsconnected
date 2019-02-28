const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const ChatMessage = require('./../models/chat_message');
const ChatUnread = require('./../models/chat_unread');
const ChatAttachment = require('./../models/chat_attachment');
const ChatConversation = require('./../models/chat_conversation');


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {

    let token = socket.handshake.query.token;
    let userId = socket.handshake.query.token;
    console.log(userId);

    console.log(`User ${userId} has connected.`);

    // Join the user's private room (by id)
    // Join the chat conversation rooms where this user is a participant in

    ChatConversation
        .loadConversationsByUserId(userId)
        .then((conversations) => {
            conversations.forEach(c => {
                socket.join(c._id);
            })
        })
        .then(socket.join(userId));

    function client() {
        // return worker(socket, io);
    }

    function update(message) {
        client().update(message);
    }

    function reply(message) {
        client().reply(message.id, (err, participants, message) => {
            if (!err) {
                // Todo: Also notify via email
            }
        });
    }

    socket.on('reconnect', function (socket) {
        console.log(`user ${socket.id} trying to reconnect.`);
    });

    socket.on('room:create', function (data) {
        let userId = socket.handshake.query.token;
        let participants = data.participants;

        ChatConversation
            .createChatConversation(userId, participants)
            .then((room) => {
                socket.join(room._id);
                socket.emit('room:created', room._id)
            });
    });

    socket.on('disconnect', function () {
        console.log(`user ${socket.id} disconnected`);
    });

    socket.on('message', (data) => {

        let user = {
            name: data.user.name,
            _id: socket.handshake.query.token,
            avatar: data.user.avatar
        };
        let msg = {
            text: data.text,
            chat_conversation_id: data.chat_conversation_id
        };

        ChatMessage
            .createChatMessage(user, msg)
            .then(reply);
    });

    socket.on('message:read', (data) => {

        let userId = socket.handshake.query.token;
        let msgId = data.chat_message_id

        ChatUnread
            .createUnreadMessage(userId, msgId)
            .then(update);
    });

    socket.on('recommendation', (data) => {
        // Todo: Implement recommendation notification
        socket.broadcast.emit('recommendation', data);
    });

    socket.on('achievement', () => {
        // Todo: Implement achievement notification
        socket.broadcast.emit('achievement', {
            message: "I'm achieved!"
        });
    });

});

http.listen(5000, function () {
    console.log('listening on *:5000');
});