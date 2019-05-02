const express = require('express');
const SocketController = require('../controllers/socket.js');

exports = io => {
  SocketController(io);
};
