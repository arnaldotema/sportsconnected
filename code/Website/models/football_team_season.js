var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var FootballTeamSeasonSchema = new Schema({
    acronym: String,
    avatar: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg/600px-Default_profile_picture_%28male%29_on_Facebook.jpg'
    },
    name: { type: String, required: true, unique: true},
    full_name: { type: String, unique: true}
});

module.exports = mongoose.model('football_team_season', FootballTeamSeasonSchema);
