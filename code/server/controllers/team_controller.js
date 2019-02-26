var TeamModel = require('../models/football_team.js');
var TeamModelSeason = require('../models/football_team_season');
var FootballMedia = require('../models/football_media');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
/**
 * team_controller.js
 *
 * @description :: Server-side logic for managing Teams.
 */
module.exports = {

    /**
     * TeamController.search()
     */
    search: function (req, res) {
        let select = {
            "_id": 1,
            "user_info_id": 1,
            "personal_info": 1,
            "team": 1,
            "stats": 1
        };

        let query = {};

        req.body.query.forEach(function (filter) {
            query[filter.search_item] = {};
            query[filter.search_item][filter.selected_filter] = filter.selected_value;

            if (filter.selected_filter == '$regex') {
                query[filter.search_item]['$options'] = 'i';
            }
        });

        TeamModel
            .find(query)
            .select(select)
            .exec(function (err, teams) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting teams.',
                        error: err
                    });
                }
                return res.json(JSON.parse(entities.decode(JSON.stringify(teams))));
            });
    },

    /**
     * TeamController.list()
     */
    list: function (req, res) {
        TeamModel
            .find()
            .populate('current_season')
            .populate('previous_seasons', 'standings')
            .limit(5)
            .exec(function (err, Teams) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting Team.',
                        error: err
                    });
                }
                return res.json(JSON.parse(entities.decode(JSON.stringify(Teams))));
            });
    },

    /**
     * TeamController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        TeamModel
            .findOne({_id: id})
            .populate('current_season')
            .populate('previous_seasons', 'standings')
            .exec(function (err, Team) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting Team.',
                        error: err
                    });
                }
                if (!Team) {
                    return res.status(404).json({
                        message: 'No such Team'
                    });
                }
                return res.json(JSON.parse(entities.decode(JSON.stringify(Team))));
            });
    },

    players: function (req, res) {
        var id = req.params.id;
        TeamModelSeason
            .findOne({_id: id})
            .exec(function (err, Team) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting Team.',
                        error: err
                    });
                }
                if (!Team) {
                    return res.status(404).json({
                        message: 'No such Team'
                    });
                }
                return res.json(JSON.parse(entities.decode(JSON.stringify(Team.players))));
            });
    },

    /**
     * TeamController.create()
     */
    create: function (req, res) {
        var Team = new TeamModel({
            user_id: req.body.user_id,
            name: req.body.name,
            admins: req.body.admins

        });

        Team.save(function (err, Team) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Team',
                    error: err
                });
            }
            return res.status(201).json(Team);
        });
    },

    /**
     * TeamController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        TeamModel.findOne({_id: id}, function (err, Team) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Team',
                    error: err
                });
            }
            if (!Team) {
                return res.status(404).json({
                    message: 'No such Team'
                });
            }

            Team.user_info_id = req.body.user_id ? req.body.user_id : Team.user_id;
            Team.name = req.body.name ? req.body.name : Team.name;
            Team.admins = req.body.admins ? req.body.admins : Team.admins;

            Team.save(function (err, Team) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Team.',
                        error: err
                    });
                }

                return res.json(Team);
            });
        });
    },

    /**
     * TeamController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        TeamModel.findByIdAndRemove(id, function (err, Team) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Team.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },


    // Media

    listMedia: function (req, res) {
        let id = req.params.id;

        let offset = parseInt(req.query.offset || '0');
        let size = parseInt(req.query.size || '100');

        FootballMedia
            .find()
            .where("team_id").equals(id)
            .skip(offset * size)
            .limit(size)
            .exec(function (err, media) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting media.',
                        error: err
                    });
                }
                return res.json(JSON.parse(entities.decode(JSON.stringify(media))));
            });
    },

    showMedia: function (req, res) {
        let id = req.params.id;

        FootballMedia
            .findOne({_id: id})
            .where("team_id").equals(id)
            .exec(function (err, media) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting media.',
                        error: err
                    });
                }
                return res.json(JSON.parse(entities.decode(JSON.stringify(media))));
            });
    },

    createMedia: function (req, res) {
        let userInfoId = req.params.id;
        let media = req.body.media;

        if (!media) {
            return res.status(404).json({
                message: 'Missing media object'
            });
        }
        if (!media.season_id) {
            return res.status(404).json({
                message: 'Media object requires season id.'
            });
        }

        media.user_info_id = user_info_id;
        media.user_type = 'football_team';
        let newMedia = new FootballMedia(media);

        newMedia.save(function (err, createdMedia) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating media',
                    error: err
                });
            }

            TeamModel.addMedia(createdMedia, userInfoId, (err, team) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating team_season',
                        error: err
                    });
                }
                if (!team) {
                    return res.status(404).json({
                        message: 'No such team'
                    });
                }
            })
        })
    },

    updateMedia: function (req, res) {
        let mediaId = req.params.mediaId;
        let media = req.body.media;

        if (!media) {
            return res.status(404).json({
                message: 'Missing media object'
            });
        }

        FootballMedia.update(mediaId, media, (err, media) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting media.',
                    error: err
                });
            }
            return res.json(JSON.parse(entities.decode(JSON.stringify(media))));
        });
    },

    removeMedia: function (req, res) {
        let mediaId = req.params.mediaId;

        FootballMedia.findByIdAndRemove(mediaId, (err) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the media.',
                    error: err
                });
            }
            return res.status(204).json();
        });

    }
};
