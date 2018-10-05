const logger = require('../logging');
const _ = require('underscore');

let Service = {};

Service.updateAndReturnByZeroZeroId = function (zerozero_id, user_info, cb) {
    const query = {"external_ids.zerozero": zerozero_id};

    this.findOneAndUpdate(query, user_info, {upsert: true, new: true, setDefaultsOnInsert: true}, cb);
};

Service.updateUserInfosCurrentSeason = function (seasons, cb) {
    let operations = [];

    seasons.forEach(function (season) {
        let user_info_season = season._doc;

        operations.push({
            updateOne: {
                filter: {
                    "_id": user_info_season.user_info_id
                },
                update: {
                    $set: {
                        "current_season": user_info_season._id
                    },
                    $push: {
                        "previous_seasons": user_info_season._id
                    }
                }
            }
        });
    });
    this.bulkWrite(operations, {}, cb);
}

Service.addRecommendation = function (recommendation_id, user_info_id, cb) {
    let operations = [];

    operations.push({
        updateOne: {
            filter: {
                "_id": user_info_id
            },
            update: {
                $push: {
                    "recommendations.list": recommendation_id
                }
            }
        }
    });

    this.bulkWrite(operations, {}, cb);
}

Service.editRecommendation = function (recommendation, user_info_id, cb) {
}

Service.deleteRecommendation = function (recommendation, user_info_id, cb) {
}

Service.addSkillVote = function (skill_name, author_user_id, user_info_id, cb) {

    let conditions = {
        "_id": user_info_id,
        "skill_set.name": skill_name
    };
    let update = {
        $push: {
            "skill_set.$.endorsements": author_user_id
        }
    };

    this.update(conditions, update, {}, cb);
}

Service.setAllSkillVotes = function (cb) {

    let start_up_arrays = [
        {
            name: 'Goleador',
            avatar: '/assets/scorer.png',
            endorsements: [],
        },
        {
            name: 'Drible',
            avatar: '/assets/dribble.png',
            endorsements: [],
        },
        {
            name: 'Rapidez',
            avatar: '/assets/fast.png',
            endorsements: [],
        },
        {
            name: 'Passador',
            avatar: '/assets/passer.png',
            endorsements: [],
        },
        {
            name: 'Força',
            avatar: '/assets/strong.png',
            endorsements: [],
        },
        {
            name: 'Muralha defensiva',
            avatar: '/assets/defender.png',
            endorsements: [],
        }
    ];

    let conditions = {type: 1};
    let update = {
        $set: {
            skill_set: start_up_arrays
        }
    };
    let options = {multi: true};

    this.update(conditions, update, options, cb);
};

Service.follow = function (follower_id, user_info_id, cb) {

    let operations = [];

    operations.push({
        updateOne: {
            filter: {
                "_id": user_info_id
            },
            update: {
                $push: {
                    "followers": follower_id
                }
            }
        }
    });

    operations.push({
        updateOne: {
            filter: {
                "_id": follower_id
            },
            update: {
                $push: {
                    "following": user_info_id
                }
            }
        }
    });

    this.bulkWrite(operations, {}, cb);
}

Service.unfollow = function (unfollower_id, user_info_id, cb) {

    let operations = [];


    operations.push({
        updateOne: {
            filter: {
                "_id": user_info_id
            },
            update: {
                $pull: {
                    "followers": unfollower_id
                }
            }
        }
    });

    operations.push({
        updateOne: {
            filter: {
                "_id": unfollower_id
            },
            update: {
                $pull: {
                    "following": user_info_id
                }
            }
        }
    });

    this.bulkWrite(operations, {}, cb);
}

module.exports = Service;
