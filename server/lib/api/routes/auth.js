"use strict";

const DUPLICATE_ENTRY_CODE = 11000;
const express = require("express");
const passport = require("passport");
const router = express.Router();
const AuthController = require("../controllers/auth.js");

const FootballUserInfo = require("../../models/football_user_info.js");
const User = require("../../models/football_user.js");
const FootballTeam = require("../../models/football_team.js");
const extractProfileData = require("../../utils/extractProfileData.js");
const jwt = require("jsonwebtoken");

const logIn = async (error, user, res, next) => {
  if (error) return next(error);

  try {
    switch (user.user_type) {
      case "football_team":
        FootballTeam.findOne({ _id: user.profile_id })
          .populate("current_season")
          .exec((err, result) => extractProfileData(err, result, res, user));
        break;
      case "football_user_info":
        FootballUserInfo.findOne({ _id: user.profile_id })
          .populate("current_season")
          .exec((err, result) => extractProfileData(err, result, res, user));
        break;
      default:
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "top_secret");
        return res.json({ token: token, ...body });
    }
    next();
  } catch (err) {
    return next(err);
  }
};

router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;
  const data = {
    email: email,
    password: password
  };

  const userData = await User.create(data).catch(e => {
    if (e.code === DUPLICATE_ENTRY_CODE) return next("User already exists");
    return next(e.message);
  });

  const user = userData._doc;

  req.login(user, { session: false }, async error => {
    if (error) return next(error);

    const body = { _id: user._id, email: user.email };

    //Sign the JWT token and populate the payload with the user email and id
    const token = jwt.sign({ user: body }, "top_secret");

    return res.json({ token: token, ...body });
  });
});

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user) => {
    if (err) return next(err);
    req.login(user, { session: false }, async error =>
      logIn(error, user, res, next)
    );
  })(req, res, next);
});

router.post("/:id/aggregate-profile", AuthController.aggregate_profile);

module.exports = router;
