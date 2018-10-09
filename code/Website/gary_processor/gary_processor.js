const schedule = require('node-schedule');
const logger = require('../logging');
const footballAchievement = require('../models/football_achievement');
const footballUserInfo = require('../models/football_user_info');

let Service = {};

let achievements = [];
let last_run = new Date(0);

Service.updateRecommendations = function() {
    footballAchievement.getAll(function (err, result) {
        if (err) {
            logger.error(err);
        }
        else {
            achievements = result;
        }
    })
}

Service.rewardAchievement = function(user_info, achievement) {
    footballAchievement.addUserInfoToAchievement(user_info, achievement, function(err, result) {
        if (err) {
            logger.error(err);
        }
        else {
            footballUserInfo.addAchievementToUserInfo(achievement, user_info, function(err, result) {
                if (err) {
                    logger.error(err);
                }
                else {
                    if(result) {
                        logger.info("Achievement " + achievement.name + " rewarded to: " + user_info._id + ", Success!");
                    }
                    else {
                        logger.info("Achievement " + achievement.name + " was already rewarded to: " + user_info._id);
                    }
                }
            })
        }
    })
}

logger.info('==== Launching scheduler ====');

Service.updateRecommendations();

let regexScheduler = schedule.scheduleJob('1 * * * * *', function(fireDate){
    logger.info('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date());

    footballUserInfo.getUserInfosByUpdatedAt(last_run, function (err, result) {
        if (err) {
            logger.error(err);
        }
        else {
            result.forEach(function(user_info) {
                achievements.forEach(function (achievement) {
                    let regex = new RegExp(achievement.regex, "g");
                    const matches = ((user_info.actions_regex || '').match(regex) || []).length;
                    if(matches > 0){
                        logger.info("Achievement " + achievement.name + " rewarded to: " + user_info._id );
                        Service.rewardAchievement(user_info, achievement);
                    }
                })
            });
        }
    })
});

module.exports = Service;