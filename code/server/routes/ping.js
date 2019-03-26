let express = require('express');
let router = express.Router();
let GlobalController = require('../controllers/global_controller.js');

router.post('/ping', GlobalController.search);

module.exports = router;
