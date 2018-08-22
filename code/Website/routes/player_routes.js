var express = require('express');
var router = express.Router();
var PlayerController = require('../controllers/football_user_info_controller.js');

/*
 * GET
 */
router.post('/search', PlayerController.search);

/*
 * GET
 */
router.get('/:team_id', PlayerController.show);

/*
 * GET
 */
router.get('/', PlayerController.list);

/*
 * POST
 */
router.post('/', PlayerController.create);

/*
 * PUT
 */
router.put('/:team_id', PlayerController.update);

/*
 * DELETE
 */
router.delete('/:team_id', PlayerController.remove);

module.exports = router;
