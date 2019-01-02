var FootballUserInfoSeason = require('../models/football_user_info_season');
var FootballTeam = require('../models/football_team');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

let Service = {};

// User DB Interactions

Service.search = function (req, res) {
    let user_info_select = {
        "_id": 1,
        "user_info_id": 1,
        "personal_info": 1,
        "team": 1,
        "stats": 1
    };

    let team_select = {
        "_id": 1,
        "avatar": 1,
        "name": 1,
        "acronym": 1
    };

    let user_info_season_query = {
        'personal_info.name': {
            '$regex': req.body.query,
            '$options': 'i'
        }
    };

    let team_query = {
        'name': {
            '$regex': req.body.query,
            '$options': 'i'
        }
    };

    let global_search_result = [];


    /*
  personal_info:{
    name: string,
    avatar: string
  };
  team: {
    id: string,
    acronym: string,
    avatar: string,
    name: string,
    full_name: string
  };
  _id: string;
  user_info_id: string;
  type: string;

*/


    FootballUserInfoSeason
        .find(user_info_season_query)
        .select(user_info_select)
        .exec(function (err, user_infos) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user_info.',
                    error: err
                });
            }

            user_infos = JSON.parse(entities.decode(JSON.stringify(user_infos)));

            user_infos.forEach(user_info => {
                user_info['type'] = 'user-info';
            });

            global_search_result.push.apply(global_search_result, user_infos);

            FootballTeam
                .find(team_query)
                .select(team_select)
                .exec(function (err, teams) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when getting teams.',
                            error: err
                        });
                    }

                    teams = JSON.parse(entities.decode(JSON.stringify(teams)));

                    teams.forEach(team => {
                        team['personal_info'] = {
                            'name': team.name,
                            'avatar': team.avatar
                        };
                        team['user_info_id'] = team._id;
                        team['type'] = 'team';
                        team['team'] = {
                            'team_id': team._id,
                            'name': team.acronym
                        };

                    });

                    global_search_result.push.apply(global_search_result, teams);

                    return res.json(global_search_result);
                });
        });
};

module.exports = Service;