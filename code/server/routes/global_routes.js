let express = require('express');
let router = express.Router();
let GlobalController = require('../controllers/global_controller.js');

router.post('/search', GlobalController.search);

module.exports = router;
