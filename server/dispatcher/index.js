/**
 *
 * NOTE:
 *
 * This file is not being used!
 * It will only be used when the crawler starts being triggered automatically.
 *
 * */

// LIBS
const logger = require('../logging');
const format = require('string-template');
const baseUris = require('../crawler/config/baseUris');

crawler.on('schedule', function(options) {
  options.proxy = proxyHandler.getProxy();
  logger.info(
    'ADDED ' + options.uri + ' to the queue: PROXY = ' + options.proxy
  );
});

crawler.on('request', function(options) {
  logger.info('CRAWLING ' + options.uri + ', PROXY = ' + options.proxy);
});

crawler.on('drain', function(options) {
  logger.info('NO MORE REQUESTS! DRAINED!');
});

crawler.failBack = function(res, done) {
  crawler.queue(res.options);
  done();
};

module.exports = crawler;

//Testing

const footballTeamCrawler = require('../crawler/lib/football/team');
const competitionCrawler = require('../crawler/lib/football/competition');

logger.info('Testing the editions...');

crawler.queue({
  uri: format(baseUris.TEAM_INFO, { team_id: 9 }),
  callback: proxyHandler.handleProxy,
  successCallback: footballTeamCrawler.updateTeamInfo,
  failBack: crawler.failBack,
  zerozeroId: 9,
});

crawler.queue({
  uri: format(baseUris.COMPETITION_EDITION_MATCHES, { edition_id: 109369 }),
  callback: proxyHandler.handleProxy,
  successCallback: competitionCrawler.updateCompetitionMatches,
  failBack: crawler.failBack,
  zerozeroId: 109369,
});
