const SocketController = require('../controllers/socket.js');

module.exports = io => {
  SocketController(io);
};
