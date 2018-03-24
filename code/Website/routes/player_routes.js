var express = require('express');
var router = express.Router();
var PlayerController = require('../controllers/player_controller.js');

/*
 * GET
 */
router.get('/', PlayerController.list);

/*
 * GET
 */
router.get('/:id', PlayerController.show);

/*
 * POST
 */
router.post('/', PlayerController.create);

/*
 * PUT
 */
router.put('/:id', PlayerController.update);

/*
 * DELETE
 */
router.delete('/:id', PlayerController.remove);

module.exports = router;
