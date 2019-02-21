const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const worker = require('./../services/notifications/socket_client');// Todo doesn't exist.
const ChatMessage = require('./../models/chat_message');
const ChatMessageAttachment = require('./../models/chat_attachment');
const ChatMessageConversation = require('./../models/chat_conversation');


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {

    console.log('a user connected');

    function client() {
        // return worker(socket, io);
    }


    function reply (message){
        client().reply(message.id, (err, participants, message) => {
            if (!err) {
                // Todo: Notify via email
            }
        });
    }

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('message', (data) => {

        let user = {
            name: data.user.name,
            _id: socket.decoded_token.sub.user.id,
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
        db.chatMessageStatus.setRead(socket.decoded_token.sub, data.msg, () => {
            client().update(data.msg);
        });
    });

    socket.on('recommendation', (data) => {
        socket.broadcast.emit('recommendation', data);
    });

    socket.on('achievement', () => {
        socket.broadcast.emit('achievement', {
            message: "I'm achieved!"
        });
    });

    socket.on('disconnect', () => {

    });

    socket.on('room:open', (data) => {

    });

    socket.on('user:status', (data) => {
        db.user.findOne({
            where: {
                id: socket.decoded_token.sub
            }
        }).then(user => {
            user.status = data.status;
            user.save().then(() => {
                io.emit("user:status", {
                    user: socket.decoded_token.sub,
                    status: data.status
                });
            });
        });
    });

});

http.listen(5000, function () {
    console.log('listening on *:5000');
});