"use strict";

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.js");

router.get("/", UserController.list);
router.post("/", UserController.create);

router.get("/:id", UserController.show);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.remove);

module.exports = router;
