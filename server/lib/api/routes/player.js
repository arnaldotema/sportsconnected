"use strict";

const express = require("express");
const router = express.Router();
const playerController = require("../controllers/userInfo.js");

router.get("/", playerController.list);
router.post("/", playerController.create);

router.get("/:id", playerController.show);
router.put("/:id", playerController.update);
router.delete("/:id", playerController.remove);

router.post("/search", playerController.search);

router.post("/:id/recommendations", playerController.add_recommendation);
router.get("/:id/recommendations", playerController.list_recommendations);

router.get("/:id/media", playerController.listMedia);
router.get("/:id/media/:mediaId", playerController.showMedia);
router.post("/:id/media", playerController.createMedia);
router.put("/:id/media/:mediaId", playerController.updateMedia);
router.delete("/:id/media/:mediaId", playerController.removeMedia);

router.post("/:id/skills", playerController.add_skill_vote);
router.get("/:id/skills", playerController.list_skills);

router.post("/:id/followers", playerController.follow);
router.get("/:id/followers", playerController.list_followers);
router.delete("/:id/followers/:follower_id", playerController.unfollow);

router.get("/:id/followed", playerController.list_followed);

module.exports = router;
