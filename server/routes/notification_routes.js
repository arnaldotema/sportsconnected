var express = require('express');
var router = express.Router();
var NotificationController = require('../controllers/notification_controller.js');

router.get('/:id/', NotificationController.show);
router.get('/player/:player_id/', NotificationController.listPlayerNotifications);
router.get('/team/:team_id/', NotificationController.listTeamNotifications);

router.post('/player/', NotificationController.createPlayerNotification);
router.post('/team/', NotificationController.createTeamNotification);
router.put('/:id/', NotificationController.updateNotification);
router.delete('/:id/', NotificationController.removeNotification);

module.exports = router;
