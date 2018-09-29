//Libs
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

//Configs
const config = require('./config/database');
require('./auth/auth');

//Routes
const users = require('./routes/user_routes');
const players = require('./routes/player_routes');
const teams = require('./routes/team_routes');
const competitions = require('./routes/competition_routes');
const matches = require('./routes/match_routes');

//Logging
const logger = require('./logging');

//Server
const app = express();
const port = 3000;

//Request
app.use(cors());
app.use(bodyParser.json());

//Statics
app.use(express.static(path.join(__dirname, 'dist')));

//Controllers

app.use('/api/players', passport.authenticate('jwt', { session : false }), players);
app.use('/api/teams', passport.authenticate('jwt', { session : false }), teams);
app.use('/api/competitions', passport.authenticate('jwt', { session : false }), competitions);
app.use('/api/matches', passport.authenticate('jwt', { session : false }), matches);
app.use('/users', users);

//Database
mongoose.connect(config.database);

mongoose.connection.on('connected', function(){
    console.log("im connected to " + config.database);
    //var crawler = require('./crawlers/zerozero/crawler')
})

mongoose.connection.on('error', function(err){
    console.log("Database error: " + err);
})

//Start
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
})

app.listen(port, function(){
    console.log('Server started on port ' + port);
});