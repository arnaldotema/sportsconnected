// LIBS
const Crawler = require("crawler");
const logger = require('../logging');
const proxyHandler = require('./utils/proxyHandler');
const request = require('request');
const format = require("string-template");
const baseUris = require('./config/baseUris');
const competitionCrawler = require('./lib/football/competition');
const db = require('./../db');
const zerozero = new Crawler({
    rateLimit: 50,
    jQuery: {
        name: 'cheerio',
        options: {
            normalizeWhitespace: true,
            xmlMode: true
        }
    }
});

zerozero.on('schedule',function(options){
    const session = proxyHandler.getSession();

    const j = request.jar();
    const cookie = request.cookie('jcenable=1');
    const captcha = request.cookie('cf_clearance=ffce9ae767f38d597cc9aaf347d6ebf58311e8f9-1530892002-3600');
    const user = request.cookie('zzptremember=' + session.user);
    const url = 'http://www.zerozero.pt';

    j.setCookie(cookie, url);
    j.setCookie(captcha, url);
    j.setCookie(user, url);

    options.proxy = session.proxy;
    options.jar = j;
    logger.info("ADDED " + options.uri + " to the queue: PROXY = " + options.proxy);
});

zerozero.on('request',function(options){
    logger.info("CRAWLING " + options.uri + ", PROXY = " + options.proxy);
});

zerozero.on('drain',function(options){
    logger.info("No more requests!");
});

zerozero.proxyFailCallback = function (res, done){
    zerozero.queue(res.options);
    done();
};

async function start () {
  await db.connect();

  logger.info("Testing the editions...");

  /*
  zerozero.queue({
      uri: format(baseUris.COMPETITION, {competition_id: 2380}), // 3 - ID da Super Liga, 2380 - Campeonato de Portugal
      callback: proxyHandler.crawl,
      successCallback: competitionCrawler.updateCompetition,
      proxyFailCallback: zerozero.proxyFailCallback,
      zerozeroId: 2380
  });
  */

  zerozero.queue({
    uri: format(baseUris.ASSOCIATION, {competition_id: 15}), // 15 - ID da A.Setúbal
    callback: proxyHandler.crawl,
    successCallback: competitionCrawler.updateCompetition,
    proxyFailCallback: zerozero.proxyFailCallback,
    zerozeroId: 15
  });
}

module.exports = { zerozero, start };