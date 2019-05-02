//Libs
const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const formidable = require('./api/middleware/formidable-express');

//Configs
const config = require('./config/database');
require('./api/auth/index');

//Routes
const auth = require('./api/routes/auth');
const users = require('./api/routes/user');
const players = require('./api/routes/player');
const global = require('./api/routes/global');
const ping = require('./api/routes/ping');
const teams = require('./api/routes/team');
const competitions = require('./api/routes/competition');
const matches = require('./api/routes/match');
const sockets = require('./api/routes/socket');
const storage = require('./api/routes/storage');

//Logging
const logger = require('../logging');

//Server
const app = express();
const port = 3000;
const http = require('http').Server(app);
const io = require('socket.io')(http);

//Request
app.use(cors());

//Uploads
app.use(formidable());

//Statics
app.use(express.static(path.join(__dirname, 'dist')));

//Socket
io.use(passport.authenticate('jwt', { session: false }));
sockets(io);

//Controllers
app.use('/api/healthcheck', global);
app.use('/api/global', passport.authenticate('jwt', { session: false }), ping);
app.use(
  '/api/players',
  passport.authenticate('jwt', { session: false }),
  players
);
app.use('/api/teams', passport.authenticate('jwt', { session: false }), teams);
app.use(
  '/api/competitions',
  passport.authenticate('jwt', { session: false }),
  competitions
);
app.use(
  '/api/matches',
  passport.authenticate('jwt', { session: false }),
  matches
);
app.use('/api/storage', storage);
app.use('/api/users', users);
app.use('/api/auth', auth);

//Database
mongoose.connect(config.database);

mongoose.connection.on('connected', function() {
  console.log('im connected to ' + config.database);
  // const crawler = require('./crawlers/zerozero/crawler')
  // const gary_processor = require('./gary_processor/gary_processor')
});

mongoose.connection.on('error', function(err) {
  console.log('Database error: ' + err);
});

//Start
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function() {
  console.log('Server started on port ' + port);
});
