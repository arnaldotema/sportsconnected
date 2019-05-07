"use strict";

const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/notification.js");

router.get("/:id/", NotificationController.show);

router.get(
  "/player/:player_id/",
  NotificationController.listPlayerNotifications
);

router.get("/team/:team_id/", NotificationController.listTeamNotifications);

router.post("/player/", NotificationController.createPlayerNotification);

router.post("/team/", NotificationController.createTeamNotification);

router.put("/:id/", NotificationController.updateNotification);

router.delete("/:id/", NotificationController.removeNotification);

module.exports = router;
