var express = require('express');
var router = express.Router();
var CompetitionController = require('../controllers/competition_controller.js');

/*
 * GET
 */
router.get('/', CompetitionController.list);

/*
 * GET
 */
router.get('/:team_id', CompetitionController.show);

/*
 * POST
 */
router.post('/', CompetitionController.create);

/*
 * PUT
 */
router.put('/:team_id', CompetitionController.update);

/*
 * DELETE
 */
router.delete('/:team_id', CompetitionController.remove);

module.exports = router;
