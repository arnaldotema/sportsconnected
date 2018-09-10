var express = require('express');
var router = express.Router();
var PlayerController = require('../controllers/user_info_controller.js');

/*
 * GET
 */
router.post('/search', PlayerController.search);

router.get('/:id', PlayerController.show);

router.get('/', PlayerController.list);

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
