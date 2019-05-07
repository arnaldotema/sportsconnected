"use strict";

const proxyHandler = require("../../utils/proxyHandler");
const logger = require("../../logging");
const { baseUris } = require("./../../config");
const format = require("string-template");
const {
  updateByZeroZeroId,
  updateCurrentSeasons
} = require("../../services/football/team");

const {
  updateByZeroZeroId: updateTeamSeasonByZeroZeroId,
  getByIds: getTeamSeasonByIds,
  addCompetitionToTeam,
  updateTeamsPositions
} = require("../../services/football/teamSeason");

const {
  addTeamToCompetition,
  getById: getCompetitionSeasonById
} = require("../../services/football/competitionSeason");

let { queue, failBack } = require("../../index");

const userInfoCrawler = require("./userInfo");
const { processMatchInfo } = require("./match");

exports.updateTeamInfo = function(err, res, done) {
  let team = {
    acronym: "",
    avatar: "",
    name: "",
    full_name: "",
    external_ids: {
      zerozero: res.options.zerozeroId
    }
  };

  team.acronym = res.$("#page_header .factsheet .name").html()
    ? res.$("#page_header .factsheet .name").html()
    : "";

  team.avatar = res.$("#page_header .logo img")
    ? "https://www.zerozero.pt/" +
      res.$("#page_header .logo img")[0].attribs["data-cfsrc"]
    : "";

  team.name = res.$("#page_header .factsheet .name").html()
    ? res.$("#page_header .factsheet .name").html()
    : "";

  //Different age groups from seniors
  if (team.name !== "") {
    if (team.name.split("<")[1] !== undefined) {
      team.name = team.name =
        team.name.split("<")[0].trim() +
        " " +
        team.name.split("<")[1].split(">")[1];
    } else {
      team.name = team.name = team.name.split("<")[0].trim();
    }
  }

  team.fullName = res.$("#entity_bio .bio")[0]
    ? res.$("#entity_bio .bio")[0].children[1].data
    : "";

  logger.info("Team Info:", team);

  updateByZeroZeroId(res.options.zerozeroId, team, async function(err, result) {
    if (err) {
      logger.error(err);
      await failBack(res, done);
    } else {
      logger.info("Successfully updated team " + result._doc);

      res.options.team = result._doc;

      updateTeamSeasonInfo(err, res, done);
    }
  });
};

const updateTeamSeasonInfo = function(err, res, done) {
  let team_season = {
    team_id: res.options.team._id,
    season_id: res.options.competition_season.season_id,
    name: res.options.team.name,
    avatar: res.options.team.avatar,
    external_ids: {
      zerozero: res.options.team.external_ids.zerozero
    }
  };

  updateTeamSeasonByZeroZeroId(
    res.options.zerozeroId,
    res.options.competition_season.season_id,
    team_season,
    async function(err, result) {
      if (err) {
        logger.error(err);
        await failBack(res, done);
      } else {
        res.options.team_season = result._doc;

        cascadeTeamUpdates(res, done);
      }
    }
  );
};

const cascadeTeamUpdates = function(res, done) {
  const team_season = res.options.team_season;
  const competition_season = res.options.competition_season;

  addCompetitionToTeam(team_season._id, competition_season, async function(
    err,
    result
  ) {
    if (err) {
      logger.error("Error when adding competition_season to team:", err);
      await failBack(res, done);
    } else {
      logger.info(
        "Successfully added competition_season " +
          competition_season.name +
          " to team " +
          team_season.name,
        result
      );

      addTeamToCompetition(competition_season._id, team_season, async function(
        err,
        result
      ) {
        if (err) {
          logger.error("Error when adding team to competition_season:", err);
          await failBack(res, done);
        } else {
          logger.info(
            "Successfully added team " +
              team_season.name +
              " to competition_season " +
              competition_season.name,
            result
          );
          processAllTeamPlayers(res, done);
        }
      });
    }
  });
};

const processAllTeamPlayers = function(res, done) {
  let playerIds = [];

  failBack = require("../../index").failBack;
  queue = require("../../index").queue;

  res.$("#team_squad .staff").each(async function() {
    let playerId = res
      .$(res.$(this).find(".name .micrologo_and_text .text a")[0])
      .attr("href")
      .match(/\d+/g)[0];
    let playerNumber = res.$(res.$(this).find(".number")[0]).html();

    await queue({
      uri: format(baseUris.PLAYER_INFO, { player_id: playerId }),
      priority: 3,
      callback: proxyHandler.handleProxy,
      successCallback: userInfoCrawler.updateUserInfo,
      failBack: failBack,
      zerozeroId: playerId,
      competition_season: res.options.competition_season,
      team_season: res.options.team_season,
      player_number: playerNumber
    });

    await queue({
      uri: format(baseUris.PLAYER_INFO, { player_id: playerId }),
      priority: 4,
      callback: proxyHandler.handleProxy,
      successCallback: userInfoCrawler.updateUserInfoCurrentSeasons,
      failBack: failBack,
      competition_season: res.options.competition_season,
      team_season: res.options.team_season
    });

    playerIds.push(playerId);
  });

  logger.info("Team Player IDs in processing: " + playerIds);

  done();
};

const processAllTeamGames = function(err, res, done) {
  let matchIds = [];

  res.$("#team_games table tr .result a").each(async function() {
    let matchId = res
      .$(this)
      .attr("href")
      .match(/\d+/g)[0];
    let seasonId = res
      .$(this)
      .attr("href")
      .match(/\d+/g)[1];

    await queue({
      uri: format(baseUris.MATCH_INFO, {
        match_id: matchId,
        season_id: seasonId
      }),
      priority: 9,
      callback: proxyHandler.handleProxy,
      successCallback: processMatchInfo,
      zerozeroId: matchId
    });

    matchIds.push(matchId);
  });

  logger.info("Team Matches IDs in processing: " + matchIds);
  done();
};

exports.processTeamPositionsAndSeason = function(err, res, done) {
  getCompetitionSeasonById(res.options.competition_season._id, async function(
    err,
    result
  ) {
    if (err) {
      logger.error(err);
      await failBack(res, done);
    } else {
      let competition_season = result._doc;

      let ids = [];
      let team_ids = [];

      competition_season.standings.forEach(function(team) {
        ids.push(team.id);
        team_ids.push(team.team_id);
      });

      getTeamSeasonByIds(ids, async (err, result) => {
        if (err) {
          logger.error(err);
          await failBack(res, done);
        } else {
          let seasons = result;

          updateTeamsPositions(
            competition_season,
            seasons,
            async (err, result) => {
              if (err) {
                logger.error(err);
                await failBack(res, done);
              } else {
                updateCurrentSeasons(seasons, async (err, result) => {
                  if (err) {
                    logger.error(err);
                    await failBack(res, done);
                  } else {
                    done();
                  }
                });
              }
            }
          );
        }
      });
    }
  });
};
