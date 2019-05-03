const express = require('express');
const router = express.Router();
const GlobalController = require('../controllers/global.js');

router.post('/ping', GlobalController.search);

module.exports = router;
