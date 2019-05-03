'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();

const AuthController = require('../controllers/auth.js');
const logIn = require('../middleware/logIn');
const signUp = require('../middleware/signUp');

router.post(
  '/',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    let user = req.user._doc;
    req.login(user, { session: false }, async error =>
      signUp(user, error, res, req, next)
    );
  }
);

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    req.login(user, { session: false }, async error =>
      logIn(user, error, res, req, next)
    );
  })(req, res, next);
});

router.post('/:id/aggregate-profile', AuthController.aggregate_profile);

module.exports = router;
