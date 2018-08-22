var express = require('express');
var router = express.Router();
var TeamController = require('../controllers/team_controller.js');

/*
 * GET
 */
router.get('/', TeamController.list);

/*
 * GET
 */
router.get('/:team_id', TeamController.show);

/*
 * POST
 */
router.post('/', TeamController.create);

/*
 * PUT
 */
router.put('/:team_id', TeamController.update);

/*
 * DELETE
 */
router.delete('/:team_id', TeamController.remove);

module.exports = router;
