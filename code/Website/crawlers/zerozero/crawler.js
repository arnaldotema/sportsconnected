// LIBS
const Crawler = require("crawler");
const logger = require('../../logging');
var format = require("string-template");

// CRAWLER RELATED
const baseUris = require('./base_uris');

let zerozero = new Crawler({
    rateLimit: 5000
    // search for worker threads implementation
    // default worker threads = 10, but accordingly to the 5000 rateLimit, it will only use 1 worker thread
});

const proxies = [
    "http://94.23.56.95:8080"
];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

zerozero.on('schedule',function(options){
    options.proxy = proxies[getRandomInt(proxies.length)];
    logger.info("ADDED " + options.uri + " to the queue: PROXY = " + options.proxy);
});

zerozero.on('request',function(options){
    logger.info("CRAWLING " + options.uri);
});

module.exports = zerozero;


//Testing

const competition = require('./functions/football_competition');

logger.info("Testing the editions...");

zerozero.queue({
    uri:format(baseUris.COMPETITION_EDITION, { id_edition: 109369 }),
    callback: competition.updateCompetitionTeams
});
