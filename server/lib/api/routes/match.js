const express = require('express');
const router = express.Router();
const MatchController = require('../controllers/match.js');

router.get('/', MatchController.list);

router.get('/team/next/:teamId/:nMatches', MatchController.showNextByTeam);

router.get('/team/last/:teamId/:nMatches', MatchController.showLastByTeam);

router.get('/:id', MatchController.show);

router.post('/', MatchController.create);

router.put('/:id', MatchController.update);

router.delete('/:id', MatchController.remove);

module.exports = router;
