// LIBS
const Crawler = require("crawler");
const logger = require('../../logging');
const proxyHandler = require('./proxy_handler');
const request = require('request');
const format = require("string-template");

// CRAWLER RELATED
const baseUris = require('./base_uris');

var j = request.jar();
var cookie = request.cookie('jcenable=1');
var url = 'http://www.zerozero.pt';
j.setCookie(cookie, url);
request({url: url, jar: j}, function () {
    request('http://images.google.com')
})

let zerozero = new Crawler({
    rateLimit: 5000,
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

logger.info("Testing the editions...");

zerozero.queue({
    uri:format(baseUris.TEAM_INFO, { team_id: 9 }),
    callback: proxyHandler.crawl,
    successCallback: footballTeamCrawler.updateTeamInfo,
    proxyFailCallback: zerozero.proxyFailCallback,
    zerozeroId: 9
});
