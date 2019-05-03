const schedule = require('node-schedule');
const logger = require('../../logging');
const FootballAchievement = require('../models/football_achievement');
const FootballUserInfo = require('../models/football_user_info');
const achievementsMailer = require('../mailers/achievements');
const achievementsNotifications = require('../api/services/notifications/index');

let Service = {};

let achievements = [];
let last_run = new Date(0);

Service.updateRecommendations = function() {
  FootballAchievement.getAll(function(err, result) {
    if (err) {
      logger.error(err);
    } else {
      achievements = result;
    }
  });
};

Service.rewardAchievement = function(user_info, achievement, cb) {
  FootballAchievement.addUserInfoToAchievement(user_info, achievement, function(
    err,
    result
  ) {
    if (err) {
      logger.error(err);
    } else {
      FootballUserInfo.addAchievementToUserInfo(achievement, user_info, cb);
    }
  });
};

logger.info('==== Launching scheduler ====');

Service.updateRecommendations();

let test = true;

let regexScheduler = schedule.scheduleJob('*/20 * * * * *', function(fireDate) {
  logger.info(
    'This job was set to run at ' +
      fireDate +
      ', and actually ran at ' +
      new Date()
  );

  FootballUserInfo.getUserInfosByUpdatedAt(last_run, function(err, result) {
    if (err) {
      logger.error(err);
    } else {
      test = true;
      result.forEach(function(user_info) {
        achievements.forEach(function(achievement) {
          let regex = new RegExp(achievement.regex, 'g');
          const matches = ((user_info.actions_regex || '').match(regex) || [])
            .length;
          if (matches >= achievement.regex_matches) {
            //logger.info("Achievement " + achievement.name + " rewarded to: " + user_info._id );
            Service.rewardAchievement(user_info, achievement, function(
              err,
              result
            ) {
              if (err) {
                logger.error(err);
              } else {
                if (result) {
                  logger.info(
                    'Achievement ' +
                      achievement.name +
                      ' rewarded to: ' +
                      user_info._id +
                      ', Success!'
                  );
                  achievementsMailer.ownAchievementMail(user_info, achievement);
                  achievementsNotifications.newAchievement(
                    user_info,
                    achievement
                  );
                } else {
                  logger.info('Achievement already rewarded!');
                }
              }
            });
          }
        });
      });
    }
  });
});

module.exports = Service;
