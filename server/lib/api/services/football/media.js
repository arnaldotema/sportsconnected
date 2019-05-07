'use strict';

const UserInfo = require('../../../models/football_user_info');
const Team = require('../../../models/football_team');
const Media = require('./../../../models/football_media');

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

exports.migrateUserInfoMediaToMediaDocument = function (cb) {
  UserInfo.find()
    .populate('current_season')
    .exec(function(err, userInfos) {
      userInfos = JSON.parse(entities.decode(JSON.stringify(userInfos)));
      if (err) return cb(err);
      userInfos.forEach(userInfo => {
        userInfo = JSON.parse(entities.decode(JSON.stringify(userInfo)));
        if (userInfo.current_season && userInfo.current_season.media) {
          let media = userInfo.current_season.media;
          media.forEach(m => {
            m.user_info_id = userInfo._id;
            m.user_type = 'football_user_info';
            m.season_id = userInfo.current_season._id;
            Media.create(m, (err, insertedMedia) => {
              insertedMedia = JSON.parse(
                entities.decode(JSON.stringify(insertedMedia))
              );
              cb(err, insertedMedia);
            });
          });
        }
      });
    });
};

exports.migrateTeamMediaToMediaDocument = function (cb) {
  Team.find()
    .populate('current_season')
    .exec(function(err, teams) {
      if (err) return cb(err);
      teams.forEach(team => {
        let media = team.current_season.media;
        media.forEach(m => {
          m.team_id = team._id;
          m.user_type = 'football_team';
          m.season_id = team.current_season._id;
          Media.create(m, (err, insertedMedia) => {
            cb(err, insertedMedia);
          });
        });
      });
    });
};

exports.update = function (id, media, cb) {
  Media.findOneAndUpdate(
    { _id: id },
    media,
    { upsert: true, new: true, setDefaultsOnInsert: true },
    cb
  );
};
