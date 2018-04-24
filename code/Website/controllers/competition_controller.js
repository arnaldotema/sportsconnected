var CompetitionModel  = require('../models/football_competition.js');

/**
 * competition_controller.js
 *
 * @description :: Server-side logic for managing Competitions.
 */
module.exports = {

    /**
     * CompetitionController.list()
     */
    list: function (req, res) {
        CompetitionModel.find(function (err, Competitions) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Competition.',
                    error: err
                });
            }
            return res.json(Competitions);
        });
    },

    /**
     * CompetitionController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        CompetitionModel.findOne({_id: id}, function (err, Competition) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Competition.',
                    error: err
                });
            }
            if (!Competition) {
                return res.status(404).json({
                    message: 'No such Competition'
                });
            }
            return res.json(Competition);
        });
    },

    /**
     * CompetitionController.create()
     */
    create: function (req, res) {
        var object = {};

        Object.keys(CompetitionModel.schema.obj).forEach(function(key) {
            object[key] = req.body[key];
        });

        var Competition = new CompetitionModel(object);

        Competition.save(function (err, Competition) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Competition',
                    error: err
                });
            }
            return res.status(201).json(Competition);
        });
    },

    /**
     * CompetitionController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        CompetitionModel.findOne({_id: id}, function (err, Competition) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Competition',
                    error: err
                });
            }
            if (!Competition) {
                return res.status(404).json({
                    message: 'No such Competition'
                });
            }

            Object.keys(CompetitionModel.schema.obj).forEach(function(key) {
                Competition[key] = req.body[key] ? req.body[key] : Competition[key];
            });
			
            Competition.save(function (err, Competition) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Competition.',
                        error: err
                    });
                }

                return res.json(Competition);
            });
        });
    },

    /**
     * CompetitionController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        CompetitionModel.findByIdAndRemove(id, function (err, Competition) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Competition.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
