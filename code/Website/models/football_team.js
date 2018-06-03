var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var FootballTeamSchema = new Schema({
    acronym: String,
    avatar: String,
    name: String,
    full_name: String,
    current_season: {
        season_id: String,
        name: String,
        stats: [{
            competition_name: String,
            competition_avatar: String,
            games: Number,
            classification: String,
            wins: Number,
            losses: Number,
            draws: Number,
        }]
    },
    tryouts: [{
        address: String,
        age_group: String,
        days: String,
        time: String,
        requirements: String,
    }],
    personal_info: {
        site: String,
        email: String,
        phone_Number: String,
        address: String,
        president: String,
        vice_president: String,
        sports_director: String,
        number_of_teams: Number,
        number_of_athletes: Number,
        number_of_coaches: Number,
        number_of_physiotherapists: Number,
        number_of_grass_fields: Number,
        number_of_synthetic_fields: Number,
        number_of_locker_rooms: Number,
        sponsors: [{
            link: String,
            name: String
        }],
        other_sports: [String]
    },
    recommendations: {
        list: [Number],
            top_5: [
            {
                author: {
                    name: String,
                    id: Number,
                    avatar: String,
                    team: {
                        id: String,
                        acronym: String,
                        avatar: String,
                        name: String,
                    },
                },
                text: String,
            }
        ],
    },
    roster: {
        players: [{
            user_id: String,
            name: String,
            avatar: String,
            age: Number,
            Number: Number,
            positions: [String],
            nationality: String,
            residence: String
        }],
        staff: [{
            user_id: String,
            name: String,
            avatar: String,
            age: Number,
            position: String,
            nationality: String,
            residence: String
        }]
    },
    external_ids: {
        zerozero: {type: Number, required: true, unique: true, index: true},
    }
});

FootballTeamSchema.statics = require('../services/football_team_service');

module.exports = mongoose.model('football_team', FootballTeamSchema);
