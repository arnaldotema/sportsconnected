var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
let worker = require('./../services/notifications/socket_client');


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {

    console.log('a user connected');

    function client() {
        return worker(socket, io);
    }

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('message', (data) => {

        db.chatMessages
            .create({
                userId: socket.decoded_token.sub,
                message: data.message,
                chatRoomId: data.room,
                json: data.json
            })
            .then((message) => {
                client().reply(message.id, (err, participants, message) => {
                    if(!err){
                        // Todo: Notify via email
                    }
                });
            });
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