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

zerozero.on('schedule', function(options) {
  options.proxy = proxyHandler.getProxy();
  logger.info(
    'ADDED ' + options.uri + ' to the queue: PROXY = ' + options.proxy
  );
});

zerozero.on('request', function(options) {
  logger.info('CRAWLING ' + options.uri + ', PROXY = ' + options.proxy);
});

zerozero.on('drain', function(options) {
  logger.info('NO MORE REQUESTS! DRAINED!');
});

zerozero.proxyFailCallback = function(res, done) {
  zerozero.queue(res.options);
  done();
};

module.exports = zerozero;

//Testing

const footballTeamCrawler = require('../crawler/lib/football/team');
const competitionCrawler = require('../crawler/lib/football/competition');

logger.info('Testing the editions...');

zerozero.queue({
  uri: format(baseUris.TEAM_INFO, { team_id: 9 }),
  callback: proxyHandler.crawl,
  successCallback: footballTeamCrawler.updateTeamInfo,
  proxyFailCallback: zerozero.proxyFailCallback,
  zerozeroId: 9,
});

zerozero.queue({
  uri: format(baseUris.COMPETITION_EDITION_MATCHES, { edition_id: 109369 }),
  callback: proxyHandler.crawl,
  successCallback: competitionCrawler.updateCompetitionMatches,
  proxyFailCallback: zerozero.proxyFailCallback,
  zerozeroId: 109369,
});
