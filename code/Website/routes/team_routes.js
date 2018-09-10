var express = require('express');
var router = express.Router();
var TeamController = require('../controllers/team_controller.js');

/*
 * GET
 */

router.get('/:id/players', TeamController.players);

router.get('/:id', TeamController.show);

router.get('/', TeamController.list);

/*
 * POST
 */
router.post('/', TeamController.create);

/*
 * PUT
 */
router.put('/:id', TeamController.update);

/*
 * DELETE
 */
router.delete('/:id', TeamController.remove);

module.exports = router;
