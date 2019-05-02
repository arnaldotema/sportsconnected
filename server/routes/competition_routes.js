var express = require('express');
var router = express.Router();
var CompetitionController = require('../controllers/competition_controller.js');

router.get('/:id/teams', CompetitionController.teams);

router.get('/:id', CompetitionController.show);

router.get('/', CompetitionController.list);

router.post('/', CompetitionController.create);

router.put('/:id', CompetitionController.update);

router.delete('/:id', CompetitionController.remove);

module.exports = router;
