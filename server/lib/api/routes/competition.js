"use strict";

const express = require("express");
const router = express.Router();
const CompetitionController = require("../controllers/competition.js");

router.get("/:id/teams", CompetitionController.teams);

router.get("/:id", CompetitionController.show);

router.get("/", CompetitionController.list);

router.post("/", CompetitionController.create);

router.put("/:id", CompetitionController.update);

router.delete("/:id", CompetitionController.remove);

module.exports = router;
