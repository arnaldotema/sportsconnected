const express = require('express');
const router = express.Router();
const SocketController = require('../controllers/socket_controller.js');


module.exports = (io) => {
    SocketController(io);
};


