"use strict";

const express = require("express");
const router = express.Router();
const GlobalController = require("../controllers/global.js");

router.post("/", GlobalController.search);

module.exports = router;
