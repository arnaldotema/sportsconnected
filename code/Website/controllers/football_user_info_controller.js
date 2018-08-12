var FootballUserInfo = require('../models/football_user_info.js');
var FootballUserInfoSeason = require('../models/football_user_info_season');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

module.exports = {

    search: function (req, res) {
        let select = {
            "_id": 1,
            "user_info_id": 1,
            "personal_info": 1,
            "team": 1,
            "stats": 1
        };

        let query = {};

        req.body.forEach(function(filter){
            query[filter.search_item] = {};
            query[filter.search_item][filter.selected_filter] = filter.selected_value;

            if(filter.selected_filter == '$regex'){
                query[filter.search_item]['$options'] = 'i';
            }
        })


        // if(req.query.season_id){
        //     query["season_id"] = {$in: [].concat(req.query.season_id)};
        //     select["season_id"] = 1;
        // }
        // if(req.query.name){
        //     query["personal_info.name"] = {$regex : req.query.name, $options : 'i'};
        // }
        // if(req.query.team_name){
        //     query["team.name"] = {$regex : req.query.team_name, $options : 'i'};
        // }
        // if(req.query.goals){
        //     query["stats.goals"] = {$gt : req.query.goals};
        //     select["stats.goals"] = 1;
        // }
        // if(req.query.assists){
        //     query["stats.assists"] = {$gt : req.query.assists};
        //     select["stats.assists"] = 1;
        // }

        FootballUserInfoSeason
            .find(query)
            .select(select)
            .populate('current_season')
            .populate('previous_seasons', 'stats')
            .exec(function (err, user_infos) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting user_info.',
                        error: err
                    });
                }
                return res.json(JSON.parse(entities.decode(JSON.stringify(user_infos))));
            });
    },

    list: function (req, res) {
        FootballUserInfo
            .find()
            .populate('current_season')
            .populate('previous_seasons', 'stats')
            .limit(5)
            .exec(function (err, user_infos) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting user_info.',
                        error: err
                    });
                }
                return res.json(JSON.parse(entities.decode(JSON.stringify(user_infos))));
            });
    },

    show: function (req, res) {
        var id = req.params.id;
        FootballUserInfo
            .findOne({_id: id})
            .populate('current_season')
            .populate('previous_seasons', 'stats')
            .exec(function (err, user_info) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user_info.',
                    error: err
                });
            }
            if (!user_info) {
                return res.status(404).json({
                    message: 'No such user_info'
                });
            }
            return res.json(JSON.parse(entities.decode(JSON.stringify(user_info))));
        });
    },

    create: function (req, res) {
        var user_info = new FootballUserInfo({
			user_id : req.body.user_id,
			name : req.body.name

        });

        user_info.save(function (err, user_info) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user_info',
                    error: err
                });
            }
            return res.status(201).json(user_info);
        });
    },

    update: function (req, res) {
        var id = req.params.id;
        FootballUserInfo.findOne({_id: id}, function (err, user_info) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user_info',
                    error: err
                });
            }
            if (!user_info) {
                return res.status(404).json({
                    message: 'No such user_info'
                });
            }

            user_info.user_info_id = req.body.user_id ? req.body.user_id : user_info.user_id;
			user_info.name = req.body.name ? req.body.name : user_info.name;
			
            user_info.save(function (err, user_info) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user_info.',
                        error: err
                    });
                }

                return res.json(user_info);
            });
        });
    },

    remove: function (req, res) {
        var id = req.params.id;
        FootballUserInfo.findByIdAndRemove(id, function (err, user_info) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user_info.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
