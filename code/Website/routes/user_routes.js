var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user_controller.js');

/*
 * GET
 */
router.get('/', UserController.list);

/*
 * GET
 */
router.get('/:team_id', UserController.show);

/*
 * POST
 */
router.post('/', UserController.create);

/*
 * PUT
 */
router.put('/:team_id', UserController.update);

/*
 * DELETE
 */
router.delete('/:team_id', UserController.remove);

module.exports = router;
