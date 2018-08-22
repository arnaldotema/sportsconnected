var express = require('express');
var router = express.Router();
var MatchController = require('../controllers/match_controller.js');

/*
 * GET
 */
router.get('/', MatchController.list);

/*
 * GET
 */
router.get('/:team_id', MatchController.show);

/*
 * POST
 */
router.post('/', MatchController.create);

/*
 * PUT
 */
router.put('/:team_id', MatchController.update);

/*
 * DELETE
 */
router.delete('/:team_id', MatchController.remove);

module.exports = router;
