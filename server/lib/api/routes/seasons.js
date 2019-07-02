"use strict";

const express = require("express");
const router = express.Router();
const SeasonController = require("../controllers/season.js");

router.get("/", SeasonController.list);
router.post("/", SeasonController.create);

router.get("/:id", SeasonController.show);
router.put("/:id", SeasonController.update);
router.delete("/:id", SeasonController.remove);

module.exports = router;
