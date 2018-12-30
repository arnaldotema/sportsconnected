var express = require('express');
var router = express.Router();
var MatchController = require('../controllers/match_controller.js');

router.get('/', MatchController.list);

router.get('/:id', MatchController.show);

router.post('/', MatchController.create);

router.put('/:id', MatchController.update);

router.delete('/:id', MatchController.remove);

module.exports = router;
