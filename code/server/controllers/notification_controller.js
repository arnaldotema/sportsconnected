'use strict';

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const FootballNotification = require('./../models/football_notification');

function handleError(err, result, res) {
    if (err) {
        return res.status(500).json({
            message: 'Error from the API.',
            error: err
        });
    }
    if (!result) {
        return res.status(404).json({
            message: 'No such object'
        });
    }
    return res.json(JSON.parse(entities.decode(JSON.stringify(result))));
}

function show (req, res){
    let id = req.params.id;

    FootballNotification
        .findOne({_id: id})
        .exec((err, notification) => handleError(err, notification, res));
}

function listPlayerNotifications (req, res){
    let userInfoId = req.params.id;

    let offset = parseInt(req.query.offset || '0');
    let size = parseInt(req.query.size || '10');

    FootballNotification
        .find()
        .where("author._id").equals(userInfoId)
        .where("author.user_type").equals('football_user_info')
        .skip(offset * size)
        .limit(size)
        .exec((err, notifications) => handleError(err, notifications, res));
}

function listTeamNotifications (req, res){

    let teamId = req.params.id;

    let offset = parseInt(req.query.offset || '0');
    let size = parseInt(req.query.size || '10');

    FootballNotification
        .find()
        .where("author._id").equals(teamId)
        .where("author.user_type").equals('football_team')
        .skip(offset * size)
        .limit(size)
        .exec((err, notifications) => handleError(err, notifications, res));
}

function removeNotification (req, res){
    let notificationId = req.params.notificationId;

    FootballNotification.findByIdAndRemove(notificationId, (err) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the notification.',
                error: err
            });
        }
        return res.status(204).json();
    });
}

function updateNotification (req, res){
    let notificationId = req.params.notificationId;
    let notification = req.body.notification;

    if (!notification) {
        return res.status(404).json({
            message: 'Missing notification object'
        });
    }

    FootballNotification
        .update(
            notificationId,
            notification,
            (err, media) => handleError(err, media, res));
}

function createPlayerNotification (req, res){
    let userInfoId = req.params.id;
    let notification = req.body.notification;

    if (!notification) {
        return res.status(404).json({
            message: 'Missing notification object'
        });
    }

    notification._id = userInfoId;
    notification.user_type = 'football_user_info';
    let newNotification = new FootballNotification(notification);

    newNotification.save((err, n) => handleError(err, n, res));

    // Todo Socket emit the notification to its listeners
}

function createTeamNotification (req, res){
    let teamId = req.params.id;
    let notification = req.body.notification;

    if (!notification) {
        return res.status(404).json({
            message: 'Missing notification object'
        });
    }

    notification._id = teamId;
    notification.user_type = 'football_team';
    let newNotification = new FootballNotification(notification);

    newNotification.save((err, n) => handleError(err, n, res));

    // Todo Socket emit the notification to its listeners
}


module.exports = {
    show,
    listPlayerNotifications,
    listTeamNotifications,
    createPlayerNotification,
    createTeamNotification,
    updateNotification,
    removeNotification
};