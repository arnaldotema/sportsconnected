const FootballUserInfo = require("../../models/football_user_info");
const FootballMedia = require("../../models/football_media");
const FootballRecommendation = require("../../models/football_recommendation");
const FootballUserInfoSeason = require("../../models/football_user_info_season");

const userInfoService = require("../../api/services/football/userInfo");
const userInfoSeasonService = require("../../api/services/football/userInfoSeason");

const ImageStorageService = require("../services/storage/image");
const Entities = require("html-entities").AllHtmlEntities;
const entities = new Entities();

const handleError = require("./../../utils/handleApiResponse");

exports.search = async (req, res) => {
  let select = {
    _id: 1,
    user_info_id: 1,
    personal_info: 1,
    team: 1,
    stats: 1
  };

  const query = {};

  req.body.query.forEach(function(filter) {
    query[filter.search_item] = {};
    query[filter.search_item][filter.selected_filter] = filter.selected_value;

    if (filter.selected_filter === "$regex") {
      query[filter.search_item]["$options"] = "i";
    }
  });

  FootballUserInfoSeason.find(query)
    .select(select)
    .exec((err, result) => handleError(err, result, 200, res));
};

exports.list = async (req, res) => {
  FootballUserInfo.find()
    .populate("current_season")
    .populate("previous_seasons", "stats")
    .limit(5)
    .exec((err, result) => handleError(err, result, 200, res));
};

exports.show = async (req, res) => {
  const id = req.params.id;
  FootballUserInfo.findOne({ _id: id })
    .populate("current_season")
    .populate("previous_seasons", "stats")
    .populate("recommendations.list")
    .exec((err, result) => handleError(err, result, 200, res));
};

exports.create = async (req, res) => {
  const personal_info = req.body.personal_info;
  const team = req.body.team;
  const season_id = req.body.season_id;

  const userInfo = new FootballUserInfo({ ...req.body, type: 1 });

  userInfo.save(function(err, newUserInfo) {
    if (err) {
      return res.status(500).json({
        message: "Error when creating userInfo",
        error: err
      });
    }

    const user_info_id = newUserInfo._id;
    userInfoSeasonService.createNew(
      user_info_id,
      season_id,
      personal_info,
      team,
      (err, user_info_season) => {
        if (err) {
          return res.status(500).json({
            message: "Error when creating user_info_season",
            error: err
          });
        }
        const update = { current_season: user_info_season._id };

        FootballUserInfo.findOneAndUpdate(
          { _id: user_info_id },
          update,
          { upsert: true, new: true, setDefaultsOnInsert: true },
          (err, result) => handleError(err, result, 201, res)
        );
      }
    );
  });
};

exports.update = async (req, res) => {
  const id = req.params.id;

  const team = req.body.team ? req.body.team : null;
  const personal_info = req.body.personal_info;
  const avatar = req.files.avatar;

  if (avatar)
    personal_info.avatar =
      "api/storage/images/user_info_season/" + id + "/system/avatar";

  userInfoSeasonService.updateUserInfoSeason(id, personal_info, team, function(
    err,
    result
  ) {
    const userInfoSeasonDocument = JSON.parse(
      entities.decode(JSON.stringify(result))
    );
    const userInfoSeason = { __v, type, ...userInfoSeasonDocument };

    if (err) {
      return res.status(500).json({
        message: "Error when updating user_info",
        error: err
      });
    }

    if (avatar) {
      ImageStorageService.save_from_file(
        avatar,
        "user",
        id,
        "system/avatar",
        function(err) {
          if (err) {
            return res.status(500).json({
              message: "Error when storing image.",
              error: err
            });
          }
          return res.json(userInfoSeason);
        }
      );
    } else {
      return res.json(userInfoSeason);
    }
  });
};

exports.remove = async (req, res) => {
  const id = req.params.id;
  FootballUserInfo.findByIdAndRemove(id, function(err, user_info) {
    if (err) {
      return res.status(500).json({
        message: "Error when deleting the user_info.",
        error: err
      });
    }
    return res.status(204).json();
  });
};

// Media

exports.listMedia = async (req, res) => {
  const user_info__id = req.params.id;

  const offset = parseInt(req.query.offset || "0");
  const size = parseInt(req.query.size || "10");

  FootballMedia.find()
    .where("user_info_id")
    .equals(user_info__id)
    .skip(offset * size)
    .limit(size)
    .exec(function(err, media) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting media.",
          error: err
        });
      }
      return res.json(JSON.parse(entities.decode(JSON.stringify(media))));
    });
};

exports.showMedia = async (req, res) => {
  const id = req.params.id;
  FootballMedia.findOne({ _id: id }).exec((err, result) =>
    handleError(err, result, 200, res)
  );
};

exports.createMedia = async (req, res) => {
  const userInfoId = req.params.id;
  const media = req.body.media;

  if (!media) {
    return res.status(404).json({
      message: "Missing media object"
    });
  }

  media.user_info_id = userInfoId;
  media.created_at = Date.now();
  media.updated_at = Date.now();

  const newMedia = new FootballMedia(media);

  newMedia.save(async function(err, createdMedia) {
    if (err) {
      return res.status(500).json({
        message: "Error when creating media",
        error: err
      });
    }

    const userInfoSeason = await userInfoService.addMedia(
      userInfoId,
      createdMedia
    );

    if (!userInfoSeason) {
      return res.status(404).json({
        message: "User info Season not found when adding media."
      });
    }

    handleError(null, createdMedia, 201, res);
  });
};

exports.updateMedia = async (req, res) => {
  const mediaId = req.params.mediaId;
  const media = req.body.media;

  if (!media) {
    return res.status(404).json({
      message: "Missing media object"
    });
  }

  FootballMedia.update(mediaId, media, (err, media) =>
    handleError(err, media, res)
  );
};

exports.removeMedia = async (req, res) => {
  const mediaId = req.params.mediaId;

  FootballMedia.findByIdAndRemove(mediaId, err => {
    if (err) {
      return res.status(500).json({
        message: "Error when deleting the media.",
        error: err
      });
    }
    return res.status(204).json();
  });
};

// Recommendation

exports.listRecommendations = async (req, res) => {
  const offset = parseInt(req.query.offset || "0");
  const size = parseInt(req.query.size || "10");

  FootballUserInfo.findOne({ _id: id })
    .populate("current_season")
    .populate("previous_seasons", "stats")
    .skip(offset * size)
    .limit(size)
    .exec((err, user_info) => handleError(err, user_info, res));
};

exports.createRecommendation = async (req, res) => {
  const userInfoId = req.params.id;

  const recommendation = req.body.recommendation;

  if (!recommendation) {
    return res.status(404).json({
      message: "Missing recommendation object"
    });
  }

  recommendation.user_id = userInfoId;
  recommendation.created_at = Date.now();
  recommendation.updated_at = Date.now();

  const newRecommendation = new FootballRecommendation(recommendation);

  newRecommendation.save(async (err, createdRecommendation) => {
    if (err) {
      console.log(err, "There was a problem starting the server");
      return res.status(500).json({
        message: "Error when saving recommendation.",
        error: err
      });
    }

    const userInfo = await userInfoService.addRecommendation(
      userInfoId,
      createdRecommendation
    );

    if (!userInfo) {
      return res.status(404).json({
        message: "User info not found when adding recommendation."
      });
    }

    if (userInfo.actions_regex) {
      await userInfoService.updateRecommendationRegex(
        userInfo._id,
        userInfo.actions_regex
      );
    }

    handleError(null, createdRecommendation, 201, res);
  });
};

// Skills

exports.listSkills = async (req, res) => {
  FootballUserInfo.findOne({ _id: id })
    .populate("current_season")
    .populate("previous_seasons", "stats")
    .exec(function(err, user_info) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting user_info.",
          error: err
        });
      }
      if (!user_info) {
        return res.status(404).json({
          message: "No such user_info"
        });
      }
      return res.json(JSON.parse(entities.decode(JSON.stringify(user_info))));
    });
};

exports.addSkillVote = async (req, res) => {
  const user_info_id = req.params.id;
  const author_user_id = req.body.author_user_id;
  const skill_name = req.body.skill_name;

  if (!author_user_id || !skill_name) {
    return res.status(404).json({
      message: "Missing author or skill_name object"
    });
  }

  userInfoService.addSkillVote(
    skill_name,
    author_user_id,
    user_info_id,
    (err, user_info) => {
      if (err) {
        return res.status(500).json({
          message: "Error when updating user_info",
          error: err
        });
      }
      if (!user_info) {
        return res.status(404).json({
          message: "No such user_info"
        });
      }
      return res.json(JSON.parse(entities.decode(JSON.stringify(user_info))));
    }
  );
};

// Followers

exports.follow = async (req, res) => {
  const user_info_id = req.params.id;
  const author_user_info_id = req.body.author_user_info_id; // ._doc

  if (!author_user_info_id) {
    return res.status(404).json({
      message: "Missing author object"
    });
  }

  userInfoService.follow(author_user_info_id, user_info_id, (err, user_info) =>
    handleError(err, user_info, res)
  );
};

exports.listFollowed = async (req, res) => {
  const offset = parseInt(req.query.offset || "0");
  const size = parseInt(req.query.size || "10");

  FootballUserInfo.findOne({ _id: id })
    .populate("current_season")
    .populate("previous_seasons", "stats")
    .skip(offset * size)
    .limit(size)
    .exec((err, user_info) => handleError(err, user_info, res));
};

exports.listFollowers = async (req, res) => {
  const offset = parseInt(req.query.offset || "0");
  const size = parseInt(req.query.size || "10");

  FootballUserInfo.findOne({ _id: id })
    .populate("current_season")
    .populate("previous_seasons", "stats")
    .skip(offset * size)
    .limit(size)
    .exec((err, user_info) => handleError(err, user_info, res));
};

exports.unfollow = async (req, res) => {
  const user_info_id = req.params.id;
  const follower_id = req.params.follower_id;

  if (!follower_id) {
    return res.status(404).json({
      message: "Missing author object"
    });
  }

  userInfoService.unfollow(follower_id, user_info_id, (err, user_info) =>
    handleError(err, user_info, res)
  );
};
