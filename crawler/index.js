"use strict";

const Crawler = require("crawler");
const logger = require("./logging");
const { handleProxy, getSession } = require("./utils/proxyHandler");
const request = require("request");
const format = require("string-template");
const { START_COMPETITION_ID, START_LEAGUE_TYPE } = require("./config");
const { updateCompetition } = require("./api/football/competition");
const db = require("./db");

const crawler = new Crawler({
  rateLimit: 50,
  jQuery: {
    name: "cheerio",
    options: {
      normalizeWhitespace: true,
      xmlMode: true
    }
  }
});

crawler.on("schedule", function(options) {
  const session = getSession();

  const j = request.jar();
  const cookie = request.cookie("jcenable=1");
  const captcha = request.cookie(
    "cf_clearance=ffce9ae767f38d597cc9aaf347d6ebf58311e8f9-1530892002-3600"
  );
  const user = request.cookie("zzptremember=" + session.user);
  const url = "http://www.zerozero.pt";

  j.setCookie(cookie, url);
  j.setCookie(captcha, url);
  j.setCookie(user, url);

  options.proxy = session.proxy;
  options.jar = j;
  logger.info(
    "ADDED " + options.uri + " to the queue: PROXY = " + options.proxy
  );
});

crawler.on("request", function(options) {
  logger.info("CRAWLING " + options.uri + ", PROXY = " + options.proxy);
});

crawler.on("drain", function(options) {
  logger.info("No more requests!");
  stop();
});

// 15 - ID da A.Setúbal, baseUris.COMPETITION, {competition_id: 2380}),
// 3 - ID da Super Liga, 2380 - Campeonato de Portugal
const start = async function() {
  await db.connect();
  logger.info("Testing the editions...");

  crawler.queue({
    uri: format(START_LEAGUE_TYPE, { competition_id: START_COMPETITION_ID }),
    callback: handleProxy,
    successCallback: updateCompetition,
    failBack: failBack,
    zerozeroId: START_COMPETITION_ID
  });
};

const stop = async function() {
  await db.disconnect();
  process.exit(0);
};

const queue = async function(options) {
  await crawler.queue(options);
};

const failBack = async function(res, done) {
  crawler.queue(res.options);
  done();
};

module.exports = { queue, start, failBack };
