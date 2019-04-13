var express = require('express');
var router = express.Router();
var PlayerController = require('../controllers/user_info_controller.js');

router.get('/', PlayerController.list);
router.post('/', PlayerController.create);

router.get('/:id', PlayerController.show);
router.put('/:id', PlayerController.update);
router.delete('/:id', PlayerController.remove);

router.post('/search', PlayerController.search);

router.post('/:id/recommendations', PlayerController.add_recommendation);
router.get('/:id/recommendations', PlayerController.list_recommendations);

router.get('/:id/media', PlayerController.listMedia);
router.get('/:id/media/:mediaId', PlayerController.showMedia);
router.post('/:id/media', PlayerController.createMedia);
router.put('/:id/media/:mediaId', PlayerController.updateMedia);
router.delete('/:id/media/:mediaId', PlayerController.removeMedia);

router.post('/:id/skills', PlayerController.add_skill_vote);
router.get('/:id/skills', PlayerController.list_skills);

router.post('/:id/followers', PlayerController.follow);
router.get('/:id/followers', PlayerController.list_followers);
router.delete('/:id/followers/:follower_id', PlayerController.unfollow);

router.get('/:id/followed', PlayerController.list_followed);


module.exports = router;
