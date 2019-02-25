var FootballUserInfo = require('../models/football_user_info');
var FootballMedia = require('../models/football_media');
var FootballRecommendation = require('../models/football_recommendation');
var FootballUserInfoSeason = require('../models/football_user_info_season');
var ImageStorageService = require('../services/storage/image_storage_service');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

let Service = {};

// User

Service.search = function (req, res) {
    let select = {
        "_id": 1,
        "user_info_id": 1,
        "personal_info": 1,
        "team": 1,
        "stats": 1
    };

    let query = {};

    req.body.query.forEach(function (filter) {
        query[filter.search_item] = {};
        query[filter.search_item][filter.selected_filter] = filter.selected_value;

        if (filter.selected_filter == '$regex') {
            query[filter.search_item]['$options'] = 'i';
        }
    });

    FootballUserInfoSeason
        .find(query)
        .select(select)
        .exec(function (err, user_infos) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user_info.',
                    error: err
                });
            }
            return res.json(JSON.parse(entities.decode(JSON.stringify(user_infos))));
        });
};

Service.list = function (req, res) {
    FootballUserInfo
        .find()
        .populate('current_season')
        .populate('previous_seasons', 'stats')
        .limit(5)
        .exec(function (err, user_infos) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user_info.',
                    error: err
                });
            }
            return res.json(JSON.parse(entities.decode(JSON.stringify(user_infos))));
        });
};

Service.show = function (req, res) {
    var id = req.params.id;
    FootballUserInfo
        .findOne({_id: id})
        .populate('current_season')
        .populate('previous_seasons', 'stats')
        //.populate('recommendations.list')
        .exec(function (err, user_info) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user_info.',
                    error: err
                });
            }
            if (!user_info) {
                return res.status(404).json({
                    message: 'No such user_info'
                });
            }
            return res.json(JSON.parse(entities.decode(JSON.stringify(user_info))));
        });
};

Service.create = function (req, res) {
    let user_info = new FootballUserInfo({
        user_id: req.body.user_id,
        name: req.body.name

    });

    user_info.save(function (err, user_info) {
        if (err) {
            return res.status(500).json({
                message: 'Error when creating user_info',
                error: err
            });
        }
        return res.status(201).json(user_info);
    });
};

Service.update = function (req, res) {

    let id = req.params.id;
    let personal_info = JSON.parse(req.body.personal_info);
    let avatar = req.files.avatar;

    if (avatar)
        personal_info.avatar = "api/storage/images/user_info_season/" + id + "/system/avatar";

    FootballUserInfoSeason.updatePersonalInfo(id, personal_info, function (err, user_info_season) {
        if (err) {
            return res.status(500).json({
                message: 'Error when updating user_info',
                error: err
            });
        }

        if (avatar) {
            ImageStorageService.save_from_file(avatar, 'user', id, 'system/avatar', function (err, result) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when storing image.',
                        error: err
                    });
                }
                return res.json(JSON.parse(entities.decode(JSON.stringify(user_info_season))));
            });
        }
        else {
            return res.json(JSON.parse(entities.decode(JSON.stringify(user_info_season))));
        }
    });
};

Service.remove = function (req, res) {
    var id = req.params.id;
    FootballUserInfo.findByIdAndRemove(id, function (err, user_info) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the user_info.',
                error: err
            });
        }
        return res.status(204).json();
    });
};


// Media

Service.listMedia = function (req, res) {
    let user_info__id = req.params.id;

    let offset = parseInt(req.query.offset || '0');
    let size = parseInt(req.query.size || '100');

    FootballMedia
        .find()
        .where("user_info_id").equals(user_info__id)
        .skip(offset * size)
        .limit(size)
        .exec(function (err, media) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting media.',
                    error: err
                });
            }
            return res.json(JSON.parse(entities.decode(JSON.stringify(media))));
        });
};

Service.showMedia = function (req, res) {
    let userInfoId = req.params.id;

    FootballMedia
        .findOne({_id: id})
        .where("user_info_id").equals(userInfoId)
        .exec(function (err, media) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting media.',
                    error: err
                });
            }
            return res.json(JSON.parse(entities.decode(JSON.stringify(media))));
        });
};

Service.createMedia = function (req, res) {
    let userInfoId = req.params.id;
    let media = req.body.media;

    if (!media) {
        return res.status(404).json({
            message: 'Missing media object'
        });
    }
    if (!media.season_id) {
        return res.status(404).json({
            message: 'Media object requires season id.'
        });
    }

    media.user_info_id = user_info_id;
    let newMedia = new FootballMedia(media);

    newMedia.save(function (err, createdMedia) {
        if (err) {
            return res.status(500).json({
                message: 'Error when creating media',
                error: err
            });
        }

        FootballUserInfo.addMedia(createdMedia, userInfoId, (err, user_info) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating user_info_season',
                    error: err
                });
            }
            if (!user_info) {
                return res.status(404).json({
                    message: 'No such user_info'
                });
            }
        })
    })
};

Service.updateMedia = function (req, res) {
    let mediaId = req.params.mediaId;
    let media = req.body.media;

    if (!media) {
        return res.status(404).json({
            message: 'Missing media object'
        });
    }

    FootballMedia.update(mediaId, media, (err, media) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting media.',
                error: err
            });
        }
        return res.json(JSON.parse(entities.decode(JSON.stringify(media))));
    });
};

Service.removeMedia = function (req, res) {
    let mediaId = req.params.mediaId;

    FootballMedia.findByIdAndRemove(mediaId, (err) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the media.',
                error: err
            });
        }
        return res.status(204).json();
    });

};

// Recommendation

Service.list_recommendations = function (req, res) {
    FootballUserInfo
        .findOne({_id: id})
        .populate('current_season')
        .populate('previous_seasons', 'stats')
        .exec(function (err, user_info) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user_info.',
                    error: err
                });
            }
            if (!user_info) {
                return res.status(404).json({
                    message: 'No such user_info'
                });
            }
            return res.json(JSON.parse(entities.decode(JSON.stringify(user_info))));
        });
};

Service.add_recommendation = function (req, res) {
    let user_info__id = req.params.id;
    let recommendation = req.body.recommendation;

    if (!recommendation) {
        return res.status(404).json({
            message: 'Missing recommendation object'
        });
    }

    recommendation.user_id = user_info__id;
    let new_recommendation = new FootballRecommendation(recommendation);

    FootballRecommendation.create(recommendation);

    new_recommendation.save(function (err, created_recommendation) {
        if (err) {
            return res.status(500).json({
                message: 'Error when creating recommendation',
                error: err
            });
        }

        FootballUserInfo.addRecommendation(created_recommendation, user_info__id, (err, user_info) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating user_info',
                    error: err
                });
            }
            if (!user_info) {
                return res.status(404).json({
                    message: 'No such user_info'
                });
            }

            FootballUserInfo.updateRecommendationRegex(user_info, function (err, user_info) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user_info',
                        error: err
                    });
                }

                return res.json(user_info);
            })

        })

    })


};

// Skills

Service.list_skills = function (req, res) {
    FootballUserInfo
        .findOne({_id: id})
        .populate('current_season')
        .populate('previous_seasons', 'stats')
        .exec(function (err, user_info) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user_info.',
                    error: err
                });
            }
            if (!user_info) {
                return res.status(404).json({
                    message: 'No such user_info'
                });
            }
            return res.json(JSON.parse(entities.decode(JSON.stringify(user_info))));
        });
};

Service.add_skill_vote = function (req, res) {
    let user_info_id = req.params.id;
    let author_user_id = req.body.author_user_id;
    let skill_name = req.body.skill_name;

    if (!author_user_id || !skill_name) {
        return res.status(404).json({
            message: 'Missing author or skill_name object'
        });
    }

    FootballUserInfo.addSkillVote(skill_name, author_user_id, user_info_id, (err, user_info) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when updating user_info',
                error: err
            });
        }
        if (!user_info) {
            return res.status(404).json({
                message: 'No such user_info'
            });
        }
        return res.json(JSON.parse(entities.decode(JSON.stringify(user_info))));
    })
};

// Followers

Service.follow = function (req, res) {
    let user_info_id = req.params.id;
    let author_user_info_id = req.body.author_user_info_id; // ._doc

    if (!author_user_info_id) {
        return res.status(404).json({
            message: 'Missing author object'
        });
    }

    FootballUserInfo.follow(author_user_info_id, user_info_id, (err, user_info) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when following and updating user_info',
                error: err
            });
        }
        if (!user_info) {
            return res.status(404).json({
                message: 'No such user_info'
            });
        }
        return res.json(user_info);

    })
};

Service.list_followed = function (req, res) {
    FootballUserInfo
        .findOne({_id: id})
        .populate('current_season')
        .populate('previous_seasons', 'stats')
        .exec(function (err, user_info) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user_info.',
                    error: err
                });
            }
            if (!user_info) {
                return res.status(404).json({
                    message: 'No such user_info'
                });
            }
            return res.json(JSON.parse(entities.decode(JSON.stringify(user_info))));
        });
};

Service.list_followers = function (req, res) {
    FootballUserInfo
        .findOne({_id: id})
        .populate('current_season')
        .populate('previous_seasons', 'stats')
        .exec(function (err, user_info) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user_info.',
                    error: err
                });
            }
            if (!user_info) {
                return res.status(404).json({
                    message: 'No such user_info'
                });
            }
            return res.json(JSON.parse(entities.decode(JSON.stringify(user_info))));
        });
};

Service.unfollow = function (req, res) {
    let user_info_id = req.params.id;
    let follower_id = req.params.follower_id;

    if (!follower_id) {
        return res.status(404).json({
            message: 'Missing author object'
        });
    }

    FootballUserInfo.unfollow(follower_id, user_info_id, (err, user_info) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when following and updating user_info',
                error: err
            });
        }
        if (!user_info) {
            return res.status(404).json({
                message: 'No such user_info'
            });
        }
        return res.json(user_info);

    })


};

module.exports = Service;