var express = require('express');
const passport = require('passport');
var router = express.Router();
var UserController = require('../controllers/user_controller.js');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

router.get('/', UserController.list);
router.post('/', UserController.create);

router.get('/:id', UserController.show);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.remove);

module.exports = router;
