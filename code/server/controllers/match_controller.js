var MatchModel = require('../models/football_match.js');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

/**
 * match_controller.js
 *
 * @description :: Server-side logic for managing matchs.
 */
module.exports = {

    /**
     * matchController.list()
     */
    list: function (req, res) {
        var id = req.params.id;

        MatchModel.find(function (err, matches) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting match.',
                    error: err
                });
            }
            return res.json(JSON.parse(entities.decode(JSON.stringify(matches))));
        });
    },

    /**
     * matchController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        MatchModel
            .findOne({_id: id}, function (err, match) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting match.',
                    error: err
                });
            }
            if (!match) {
                return res.status(404).json({
                    message: 'No such match'
                });
            }
            return res.json(JSON.parse(entities.decode(JSON.stringify(match))));
        });
    },

    /**
     * matchController.create()
     */
    create: function (req, res) {
		var object = {};

        Object.keys(MatchModel.schema.obj).forEach(function(key) {
            object[key] = req.body[key];
        });
		
        var match = new MatchModel(object);

        match.save(function (err, match) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating match',
                    error: err
                });
            }
            return res.status(201).json(match);
        });
    },

    /**
     * matchController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        MatchModel.findOne({_id: id}, function (err, match) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting match',
                    error: err
                });
            }
            if (!match) {
                return res.status(404).json({
                    message: 'No such match'
                });
            }

            Object.keys(CompetitionModel.schema.obj).forEach(function(key) {
                match[key] = req.body[key] ? req.body[key] : match[key];
            });
			
            match.save(function (err, match) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating match.',
                        error: err
                    });
                }

                return res.json(match);
            });
        });
    },

    /**
     * matchController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        MatchModel.findByIdAndRemove(id, function (err, match) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the match.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    showLastByTeam: function (req, res) {
        let teamId = req.body.teamId || req.params.teamId || req.body.query.teamId;
        let nMatches = req.body.nMatches || req.params.nMatches || req.body.query.nMatches;
        MatchModel.getLastPlayedMatchesByTeamId(teamId, nMatches, function (err, matches) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting match.',
                    error: err
                });
            }
            return res.json(JSON.parse(entities.decode(JSON.stringify(matches))));
        });
    },

    showNextByTeam: function (req, res) {
        let teamId = req.body.teamId || req.params.teamId || req.body.query.teamId;
        let nMatches = req.body.nMatches || req.params.nMatches || req.body.query.nMatches;
        MatchModel.getNextMatchesByTeamId(teamId, nMatches, function (err, matches) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting match.',
                    error: err
                });
            }
            return res.json(JSON.parse(entities.decode(JSON.stringify(matches))));
        });
    }
};
