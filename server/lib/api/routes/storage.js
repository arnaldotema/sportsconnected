const express = require('express');
const router = express.Router();
const StorageController = require('../controllers/storage.js');

router.get('/images/user_info_season/:id/*', StorageController.retrieve_image);

router.get('/images/team_info_season/:id/*', StorageController.retrieve_image);

router.get('/videos/user_info_season/:id/*', StorageController.retrieve_image);

router.get('/videos/team_info_season/:id/*', StorageController.retrieve_image);

module.exports = router;
