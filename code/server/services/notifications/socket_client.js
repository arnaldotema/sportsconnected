'use strict';

let async = require('async');
let path = require('path');
let d = require(path.join(__dirname, '..', 'config/sequelize'));
let mail = require(path.join(__dirname, '..', 'services/mail'));
let DEVELOPMENT = (process.env.NODE_ENV === 'development');
let participants = d.chatParticipants;
let messages = d.chatMessages;
let users = d.user;
let authLogs = d.authLogs;
let authCounter = d.authCounter;
let sequelize = d.sequelize;
let validator = require('validator');
let connections = d.sockets;

let socketClient = (socket, io) => {
    let self = this;

    this.user = socket.decoded_token.sub;

    this.userType = socket.decoded_token.type;

    this.zeroDate = (d) => {
        return d < 10 ? '0'+d : d;
    };

    this.setOnline = (next) => {

        users.setOnline(self.user).then(_saved => {
            let now = new Date();
            let format = `${now.getFullYear()}-${self.zeroDate(now.getMonth() + 1)}-${self.zeroDate(now.getDate())}T00:00:00.000Z`;

            authCounter.findOne({
                where: {
                    day: format
                }
            }).then(counter => {

                let count = (counter) => {
                    authLogs.findAll({
                        where: {
                            $and: [{
                                userId: self.user
                            },
                                sequelize.where(sequelize.fn('DATE', sequelize.col('createdAt')), sequelize.literal('CURRENT_DATE'))]
                        }
                    }).then((records) => {

                        if (!records.length) {
                            counter.uniqueCount = counter.uniqueCount + 1;
                            if (self.userType == 6) {
                                counter.uniqueCreators = counter.uniqueCreators + 1;
                            } else {
                                counter.uniqueBrands = counter.uniqueBrands + 1;
                            }

                            counter.totalCount = counter.totalCount + 1;

                            counter.save().then(() => {
                                authLogs.create({
                                    userId: self.user
                                }).then(() => {
                                    next();
                                });
                            });

                        } else {
                            next();
                        }
                    });
                };

                if (!counter) {
                    authCounter.create({
                        day: format
                    }).then(counter => {
                        count(counter);
                    });
                } else {
                    count(counter);
                }
            });

        });
    };

    this.setOffline = (next) => {
        if (self.user) {
            users.setOffline(self.user, next);
        } else {
            next();
        }
    };

    this.joinUser = (u, room, callback) => {

        let next = () => {

            connections.resolve(u).then(sockets => {

                if (!sockets) {
                    return callback();
                }

                d.conversations.get(room, u).then(conv => {
                    async.each(sockets, (s, _next) => {
                        if (io.sockets.connected[s.connection]) {
                            io.sockets.connected[s.connection].join(room);
                            io.sockets.connected[s.connection].emit("room:created", conv);
                        } else {
                            io.to(s.connection).emit("room:created", conv);
                        }
                        _next();
                    }, () => {
                        if (callback) callback();
                    });
                });

            });
        };

        d.conversations.findOne({
            where: {
                chatRoomId: room,
                userId: u
            }
        }).then(c => {
            if (c.removed || c.deleted) {
                c.removed = false;
                c.deleted = false;
                c.save().then(() => {
                    next();
                });
            } else {
                next();
            }
        });
    };

    this.toRoom = (room, name, data, next) => {
        io.in(room).emit(name, data);
        if (next) {
            next();
        }
    };

    this.findParticipants = (message, next) => {
        participants.list(message.chatRoomId, next);
    };

    this.checkConversation = (users, room, callback) => {
        async.each(users, (u, next) => {
            if (u.userId !== self.user) {
                self.joinUser(u.userId, room, () => {
                    next();
                });

            } else {
                next();
            }
        }, callback);
    };

    this.reply = (record, next) => {
        messages.get(record, (message) => {
            self.findParticipants(message, (participants) => {
                self.checkConversation(participants, message.chatRoomId, () => {
                    self.toRoom(message.chatRoomId, 'message', message, () => {
                        if (next) {
                            next(null, participants, message);
                        }
                    });
                });

            });
        });
    };

    this.update = (record, next) => {
        messages.get(record, (message) => {
            self.findParticipants(message, (participants) => {
                self.toRoom(message.chatRoomId, 'message:update', message, () => {
                    if (next) {
                        next(participants, message);
                    }
                });
            });
        });
    };

    return this;
};

module.exports = socketClient;