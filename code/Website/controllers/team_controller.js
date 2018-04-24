var TeamModel = require('../models/football_team.js');

/**
 * team_controller.js
 *
 * @description :: Server-side logic for managing Teams.
 */
module.exports = {

    /**
     * TeamController.list()
     */
    list: function (req, res) {
        TeamModel.find(function (err, Teams) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Team.',
                    error: err
                });
            }
            return res.json(Teams);
        });
    },

    /**
     * TeamController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        TeamModel.findOne({_id: id}, function (err, Team) {
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
            return res.json(Team);
        });
    },

    /**
     * TeamController.create()
     */
    create: function (req, res) {
        var Team = new TeamModel({
			user_id : req.body.user_id,
			name : req.body.name,
			admins : req.body.admins

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

            Team.user_id = req.body.user_id ? req.body.user_id : Team.user_id;
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
    }
};
