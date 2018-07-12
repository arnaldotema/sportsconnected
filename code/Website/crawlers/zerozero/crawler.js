// LIBS
const Crawler = require("crawler");
const logger = require('../../logging');
const proxyHandler = require('./proxy_handler');
const request = require('request');
const format = require("string-template");

const footballTeam = require("../../models/football_team");

// CRAWLER RELATED
const baseUris = require('./base_uris');

var j = request.jar();
var cookie = request.cookie('jcenable=1');
var captcha = request.cookie('cf_clearance=ffce9ae767f38d597cc9aaf347d6ebf58311e8f9-1530892002-3600');
var user = request.cookie('zzptremember=6d888f3d2a03d081b16064e821f6abd1');
var url = 'http://www.zerozero.pt';
j.setCookie(cookie, url);
j.setCookie(captcha, url);
j.setCookie(user, url);

let zerozero = new Crawler({
    rateLimit: 50,
    jar: j,
    jQuery: {
        name: 'cheerio',
        options: {
            normalizeWhitespace: true,
            xmlMode: true
        }
    }
});

zerozero.on('schedule',function(options){
    options.proxy = proxyHandler.getProxy();
    logger.info("ADDED " + options.uri + " to the queue: PROXY = " + options.proxy);
});

zerozero.on('request',function(options){
    logger.info("CRAWLING " + options.uri + ", PROXY = " + options.proxy);
});

zerozero.on('drain',function(options){
    logger.info("NO MORE REQUESTS! DRAINED!");
});

zerozero.proxyFailCallback = function (err, res, done){
    zerozero.queue(res.options);
    done();
}

module.exports = zerozero;

//Testing

const footballTeamCrawler = require('./functions/football_team');
const competitionCrawler = require('./functions/football_competition');

logger.info("Testing the editions...");

zerozero.queue({
    uri:format(baseUris.COMPETITION_EDITION, { edition_id: 98399 }),
    callback: proxyHandler.crawl,
    successCallback: competitionCrawler.updateCompetitionInfo,
    proxyFailCallback: zerozero.proxyFailCallback,
    zerozeroId: 98399
});
