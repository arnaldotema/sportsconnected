'use strict';

const FootballUserInfo = require('./../models/football_user_info');
const FootballTeam = require('./../models/football_team');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

function migrateUserInfoMediaToMediaDocument(cb) {
    FootballUserInfo
        .find()
        .populate('current_season')
        .exec(function (err, userInfos) {
            userInfos = JSON.parse(entities.decode(JSON.stringify(userInfos)));
            if (err) return cb(err);
            userInfos.forEach(userInfo => {
                userInfo = JSON.parse(entities.decode(JSON.stringify(userInfo)));
                if(userInfo.current_season && userInfo.current_season.media){
                    let media = userInfo.current_season.media;
                    media.forEach(m => {
                        m.user_info_id = userInfo._id;
                        m.user_type = 'football_user_info';
                        m.season_id = userInfo.current_season._id;
                        this.create(m, (err, insertedMedia) => {
                            insertedMedia = JSON.parse(entities.decode(JSON.stringify(insertedMedia)));
                            cb(err, insertedMedia);
                        })
                    })
                }
            })
        });
}

function migrateTeamMediaToMediaDocument(cb) {
    FootballTeam
        .find()
        .populate('current_season')
        .exec(function (err, teams) {
            if (err) return cb(err);
            teams.forEach(team => {
                let media = team.current_season.media;
                media.forEach(m => {
                    m.team_id = team._id;
                    m.user_type = 'football_team';
                    m.season_id = team.current_season._id;
                    this.create(m, (err, insertedMedia) => {
                        cb(err, insertedMedia);
                    })
                })
            })
        });
}

function update(id, media, cb) {
    this.findOneAndUpdate({_id: id}, media, {upsert: true, new: true, setDefaultsOnInsert: true}, cb);
}

module.exports = {
    update,
    migrateUserInfoMediaToMediaDocument,
    migrateTeamMediaToMediaDocument
};