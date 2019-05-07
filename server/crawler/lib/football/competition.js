'use strict';

const format = require("string-template");

const logger = require('../../../logging');
const baseUris = require('../../config/baseUris');

const teamCrawler = require('./team');
const matchCrawler = require('./match');

const { updateAndReturnByZeroZeroId: updateCompetitionByZeroZeroId } = require('../../../lib/api/services/football/competition');
const { updateAndReturnByZeroZeroId: updateCompetitionSeasonByZeroZeroId  } = require('../../../lib/api/services/football/competitionSeason');
const { insertFutureMatches } = require('../../../lib/api/services/football/match');
const { getSeasonByName } = require('../../../lib/api/services/football/season');
const { handleProxy } = require('../../utils/proxyHandler');

let { queue, failBack } = require('../../index');

const updateCompetitionSeasonTeams = async (err, res, done) => {
  let teamIds = [];

  res.$('#edition_table tbody tr .text a').each(function () {
    let teamId = res.$(this).attr('href').match(/\d+/g)[0];
    let seasonId = res.$(this).attr('href').match(/\d+/g)[1];

    queue({
      uri: format(baseUris.TEAM_INFO, {team_id: teamId, season_id: seasonId}),
      priority: 2,
      callback: handleProxy,
      successCallback: teamCrawler.updateTeamInfo,
      zerozeroId: teamId,
      competition_season: res.options.competition_season
    });

    teamIds.push(teamId);
  });

  logger.info("Edition Teams IDs: ", teamIds);

  done();
};

const updateCompetitionSeasonCalendar = async (err, res, done) => {
  res.$("#pagination li").each(function (index) {
    queue({
      uri: format(baseUris.COMPETITION_EDITION_MATCHES, {edition_id: res.options.zerozeroId, page: index + 1}),
      priority: 1,
      callback: handleProxy,
      successCallback: updateCompetitionSeasonMatches,
      zerozeroId: res.options.zerozeroId,
      competition_season: res.options.competition_season
    });
  });

  queue({
    uri: format(baseUris.COMPETITION_EDITION_MATCHES, {edition_id: res.options.zerozeroId, page: 1}),
    priority: 10,
    callback: handleProxy,
    successCallback: teamCrawler.processTeamPositionsAndSeason,
    zerozeroId: res.options.zerozeroId,
    competition_season: res.options.competition_season
  });

  done();

};

const updateCompetitionSeason = async (err, res, done) => {
  // Checking if there are any teams in this template
  if (res.$('#edition_table').length === 0) {
    res.$('#page_main tr td .text a').each(function () {

        if (res.$(this)[0].children[0].data !== "Fase Final") {


          let seasonId = res.$(this).attr('href').match(/\d+/g)[0];

          queue({
            uri: format(baseUris.COMPETITION_EDITION, {edition_id: seasonId}),
            priority: 1,
            callback: handleProxy,
            successCallback: updateCompetitionSeason,
            zerozeroId: seasonId,
            competition: res.options.competition,
            season_name: res.options.season_name
          });
        }
        else {
          logger.info("SKIPPING FASE FINAL.");
        }
      }
    );

    done();
  }
  else {
    getSeasonByName(res.options.season_name, function (err, result) {
      if (err) {
        logger.error(err);
        failBack(res, done);
      }
      else {
        let competition_season = {
          competition_id: res.options.competition._id,
          season_id: result._doc._id,
          name: '',
          avatar: '',
          external_ids: {
            zerozero: res.options.zerozeroId,
          }
        };

        competition_season.name = res.$('#page_header .factsheet .name').length > 0 ?
          res.$('#page_header .factsheet .name').html() :
          '';

        competition_season.avatar = res.$('#page_header_container .logo img').length > 0 ?
          "http://www.zerozero.pt/" + res.$('#page_header_container .logo img')[0].attribs["data-cfsrc"] :
          '';

        updateCompetitionSeasonByZeroZeroId(res.options.zerozeroId, competition_season, async function (err, result) {
          if (err) {
            logger.error(err);
            failBack(res, done);
          }
          else {

            logger.info("Updated competition season", result._doc);

            queue({
              uri: format(baseUris.COMPETITION_EDITION_MATCHES, {
                edition_id: res.options.zerozeroId,
                page: 1
              }),
              priority: 1,
              callback: handleProxy,
              successCallback: updateCompetitionSeasonCalendar,
              zerozeroId: res.options.zerozeroId,
              competition_season: result._doc
            });

            res.options.competition_season = result._doc;

            await updateCompetitionSeasonTeams(err, res, done)
          }
        });
      }
    })
  }
  // Todo - Add an "Else" statement:
  // we need to have a new condition checking if the template has Like (1ª Divisão, etc - like here: http://www.zerozero.pt/associacao.php?id=15)
};

const updateCompetitionSeasonMatches = async (err, res, done) => {

  let matchesToSchedule = [];

  res.$("#team_games tbody .parent").each( () => {
    const matchDate = new Date(res.$(this.children[1]).html() + " " + res.$(this.children[2]).html());
    const matchId = res.$(this).attr("id");

    if (matchId) {
      //Dar meio dia para o jogo processar
      if (matchDate + 0.5 > Date.now()) {
        matchesToSchedule.push({
          played: false,
          date: matchDate,
          competition_season: {
            id: res.options.competition_season._id
          },
          external_ids: {
            zerozero: matchId
          }
        })
      }
      else {
        queue({
          uri: format(baseUris.MATCH_INFO, {match_id: matchId}),
          callback: failBack,
          priority: 9,
          successCallback: matchCrawler.processMatchInfo,
          zerozeroId: matchId,
          matchDate: matchDate,
          competition_season: res.options.competition_season
        });
      }
    }
  });

  insertFutureMatches(matchesToSchedule, (err, matches) => {
    if (err) {
      logger.error(err);
      failBack(res, done);
    }
    else {
      logger.info("Matches not played: ", matches);
      done();
    }
  });
};

exports.updateCompetition = (err, res, done) => {

  queue = require('../../index').queue;
  failBack = require('../../index').failBack;

  let competition = {
    name: '',
    avatar: ''
  };

  competition.name = res.$('#page_header .factsheet .name').length > 0 ?
    res.$('#page_header .factsheet .name').html() :
    '';

  competition.avatar = res.$('#page_header_container .logo img').length > 0 ?
    "http://www.zerozero.pt/" + res.$('#page_header_container .logo img')[0].attribs["data-cfsrc"] :
    '';

  logger.info("Competition info:", competition);

  //Fetch Editions Id's

  let editionIds = [];

  if (res.$(".nivel1 a").length) {
    res.$(".nivel1 a").each(function () {
      // Forcing to only fecth 1st division teams - 1ª Divisão
      if (res.$(this).html() === '1&#xAA; Divis&#xE3;o') {

        editionIds.push(
          {
            edition_id: res.$(this).attr("href").match(/\d+/g)[0],
            season_name: res.$(this).html()
          }
        );
      }
    });
  }
  else {
    res.$("#page_main .box table td a").each(function () {
      editionIds.push(
        {
          edition_id: res.$(this).attr("href").match(/\d+/g)[0],
          season_name: res.$(res.$(this).find("div div")[1]).html()
        }
      );
    });
  }

  // Beta, first X years.
  //editionIds = editionIds.splice(0, 1);
  editionIds = [editionIds[1]];

  updateCompetitionByZeroZeroId(res.options.zerozeroId, competition, (err, result) => {
    if (err) {
      logger.error(err);
      failBack(res, done);
    }
    else {

      logger.info("Updated competition", result._doc);

      editionIds.forEach(function (edition) {
        queue({
          uri: format(baseUris.COMPETITION_EDITION, {edition_id: edition.edition_id}),
          priority: 1,
          callback: handleProxy,
          successCallback: updateCompetitionSeason,
          zerozeroId: edition.edition_id,
          competition: result._doc,
          season_name: edition.season_name
        });
      });
      done();
    }
  });

};

