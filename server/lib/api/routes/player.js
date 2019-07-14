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

router.post("/:id/recommendations", playerController.createRecommendation);
router.get("/:id/recommendations", playerController.listRecommendations);

router.get("/:id/media", playerController.listMedia);
router.get("/:id/media/:mediaId", playerController.showMedia);
router.post("/:id/media", playerController.createMedia);
router.put("/:id/media/:mediaId", playerController.updateMedia);
router.delete("/:id/media/:mediaId", playerController.removeMedia);

router.post("/:id/skills", playerController.addSkillVote);
router.get("/:id/skills", playerController.listSkills);

router.post("/:id/followers", playerController.follow);
router.get("/:id/followers", playerController.listFollowers);
router.delete("/:id/followers/:follower_id", playerController.unfollow);

router.get("/:id/followed", playerController.listFollowed);

module.exports = router;
