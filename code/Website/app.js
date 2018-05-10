//Libs
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

//Configs
const config = require('./config/database');

//Routes
const users = require('./routes/user_routes');
const players = require('./routes/player_routes');
const teams = require('./routes/team_routes');
const competitions = require('./routes/competition_routes');

//Logging
const logger = require('./logging');

//Server
const app = express();
const port = 3000;

//Request
app.use(cors());
app.use(bodyParser.json());

//Statics
app.use(express.static(path.join(__dirname, 'public')));

//Controllers
app.use('/users', users);
app.use('/players', players);
app.use('/teams', teams);
app.use('/competitions', competitions);

//Database
mongoose.connect(config.database);

mongoose.connection.on('connected', function(){
    console.log("im connected to " + config.database);
    var lol = require('./crawlers/zerozero/crawler')
})

mongoose.connection.on('error', function(err){
    console.log("Database error: " + err);
})

//Start
app.get('/', function(req, res){
    res.send('hi');
})

app.listen(port, function(){
    console.log('Server started on port ' + port);
});