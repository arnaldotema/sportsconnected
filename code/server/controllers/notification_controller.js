'use strict';

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

function show (id, cb){

}

function listPlayerNotifications (playerId, cb){

}

function listTeamNotifications (teamId, cb){

}

function removeNotification (id, cb){

}

function updateNotification (id, cb){

}

function createNotification (notification, cb){

}


module.exports = {
    show,
    listPlayerNotifications,
    listTeamNotifications,
    createNotification,
    updateNotification,
    removeNotification
};