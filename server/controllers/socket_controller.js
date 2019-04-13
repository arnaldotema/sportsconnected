const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const ChatMessage = require('./../models/chat_message');
const ChatUnread = require('./../models/chat_unread');
const ChatConversation = require('./../models/chat_conversation');

module.exports = (io) => {

    io.sockets
        .on('connection', () => {
            /*Todo*/
            console.log("On connection was called.");
        })
        .on('authenticated', function (socket) {

            console.log("On authenticated was called.");

            //this socket is authenticated, we are good to handle more events from it.
            console.log('hello! ' + socket.decoded_token.name);


            let token = socket.decoded_token.secret;
            let userId = socket.decoded_token.secret;
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
                let userId = socket.decoded_token.secret;
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
                    _id: socket.decoded_token.secret,
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

                let userId = socket.decoded_token.secret;
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

};
