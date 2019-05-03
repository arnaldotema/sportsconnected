const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/team.js');

router.get('/:id/players', TeamController.players);

router.get('/:id', TeamController.show);

router.get('/', TeamController.list);

router.post('/', TeamController.create);

router.post('/search', TeamController.search);

router.put('/:id', TeamController.update);

router.delete('/:id', TeamController.remove);

router.get('/:id/media', TeamController.listMedia);
router.get('/:id/media/:mediaId', TeamController.showMedia);
router.post('/:id/media', TeamController.createMedia);
router.put('/:id/media/:mediaId', TeamController.updateMedia);
router.delete('/:id/media/:mediaId', TeamController.removeMedia);

module.exports = router;
