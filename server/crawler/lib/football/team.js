const zerozero = require('../../index');
const proxyHandler = require('../../utils/proxyHandler');
const logger = require('../../../logging');
const baseUris = require('../../config/baseUris');
const format = require("string-template");
const Team = require('../../../lib/models/football_team');
const TeamSeason = require('../../../lib/models/football_team_season');
const CompetitionSeason = require('../../../lib/models/football_competition_season');
const userInfoCrawler = require('./userInfo');

exports.updateTeamInfo = function (err, res, done) {

    let team = {
        acronym: '',
        avatar: '',
        name: '',
        full_name: '',
        external_ids: {
            zerozero: res.options.zerozeroId
        }
    };

    team.acronym = res.$("#page_header .factsheet .name").html() ?
        res.$("#page_header .factsheet .name").html() :
        '';

    team.avatar = res.$("#page_header .logo img") ?
        'https://www.zerozero.pt/' + res.$("#page_header .logo img")[0].attribs["data-cfsrc"] :
        '';

    team.name = res.$("#page_header .factsheet .name").html() ?
        res.$("#page_header .factsheet .name").html() :
        '';

    //Different age groups from seniors
    if (team.name !== '') {
        if (team.name.split('<')[1] !==undefined) {
            team.name = team.name = team.name.split('<')[0].trim() + " " + team.name.split('<')[1].split('>')[1];
        }
        else {
            team.name = team.name = team.name.split('<')[0].trim()
        }
    }

    team.fullName = res.$("#entity_bio .bio")[0] ?
        res.$("#entity_bio .bio")[0].children[1].data :
        '';

    logger.info("Team Info:", team);

    Team.updateAndReturnByZeroZeroId(res.options.zerozeroId, team, function (err, result) {
        if (err) {
            logger.error(err);
            zerozero.proxyFailCallback(res, done);
        }
        else {
            logger.info("Successfully updated team " + result._doc);

            res.options.team = result._doc;

            updateTeamSeasonInfo(err, res, done);
        }
    });
};

exports.updateTeamSeasonInfo = function (err, res, done) {

    let team_season = {
        team_id: res.options.team._id,
        season_id: res.options.competition_season.season_id,
        name: res.options.team.name,
        avatar: res.options.team.avatar,
        external_ids: {
            zerozero: res.options.team.external_ids.zerozero,
        }
    };

    TeamSeason.updateAndReturnByZeroZeroId(res.options.zerozeroId, res.options.competition_season.season_id, team_season, function (err, result) {
        if (err) {
            logger.error(err);
            zerozero.proxyFailCallback(res, done);
        }
        else {
            res.options.team_season = result._doc;

            cascadeTeamUpdates(res, done);
        }
    });
};

exports.cascadeTeamUpdates = function(res, done) {
    const team_season = res.options.team_season;
    const competition_season = res.options.competition_season;

    TeamSeason.addCompetitionToTeam(team_season._id, competition_season, function (err, result) {
        if (err) {
            logger.error("Error when adding competition_season to team:", err);
            zerozero.proxyFailCallback(res, done);
        }
        else {
            logger.info("Successfully added competition_season " + competition_season.name + " to team " + team_season.name, result);

            CompetitionSeason.addTeamToCompetition(competition_season._id, team_season, function (err, result) {
                if (err) {
                    logger.error("Error when adding team to competition_season:", err);
                    zerozero.proxyFailCallback(res, done);
                }
                else {
                    logger.info("Successfully added team " + team_season.name + " to competition_season " + competition_season.name, result);
                    processAllTeamPlayers(res, done);
                }
            });
        }
    });
};

exports.processAllTeamPlayers = function(res, done) {
    let playerIds = [];

    res.$("#team_squad .staff").each(function () {
        let playerId = res.$(res.$(this).find(".name .micrologo_and_text .text a")[0]).attr('href').match(/\d+/g)[0];
        let playerNumber = res.$(res.$(this).find(".number")[0]).html();

        zerozero.queue({
            uri: format(baseUris.PLAYER_INFO, {player_id: playerId}),
            priority: 3,
            callback: proxyHandler.crawl,
            successCallback: userInfoCrawler.updateUserInfo,
            proxyFailCallback: zerozero.proxyFailCallback,
            zerozeroId: playerId,
            competition_season: res.options.competition_season,
            team_season: res.options.team_season,
            player_number: playerNumber
        });

        zerozero.queue({
            uri: format(baseUris.PLAYER_INFO, {player_id: playerId}),
            priority: 4,
            callback: proxyHandler.crawl,
            successCallback: userInfoCrawler.updateUserInfoCurrentSeasons,
            proxyFailCallback: zerozero.proxyFailCallback,
            competition_season: res.options.competition_season,
            team_season: res.options.team_season
        });

        playerIds.push(playerId);
    });

    logger.info("Team Player IDs in processing: " + playerIds);

    done();

};

exports.processAllTeamGames = function (err, res, done) {
    let matchIds = [];

    res.$("#team_games table tr .result a").each(function () {
        let matchId = res.$(this).attr('href').match(/\d+/g)[0];
        let seasonId = res.$(this).attr('href').match(/\d+/g)[1];

        zerozero.queue({
            uri: format(baseUris.MATCH_INFO, {match_id: matchId, season_id: seasonId}),
            priority: 9,
            callback: proxyHandler.crawl,
            successCallback: footballMatchCrawler.processMatchInfo,
            zerozeroId: matchId
        });

        matchIds.push(matchId);
    });

    logger.info("Team Matches IDs in processing: " + gameIds);

    done();
};

exports.processTeamPositionsAndSeason = function(err, res, done) {
    CompetitionSeason.getById(res.options.competition_season._id, function (err, result) {
        if (err) {
            logger.error(err);
            zerozero.proxyFailCallback(res, done);
        }
        else {
            let competition_season = result._doc;

            let ids = [];
            let team_ids = [];

            competition_season.standings.forEach(function (team) {
                ids.push(team.id);
                team_ids.push(team.team_id);
            });

            TeamSeason.getByIds(ids, function (err, result) {
                if (err) {
                    logger.error(err);
                    zerozero.proxyFailCallback(res, done);
                }
                else {
                    let seasons = result;

                    TeamSeason.updateTeamsPositions(competition_season, seasons, function (err, result) {
                        if (err) {
                            logger.error(err);
                            zerozero.proxyFailCallback(res, done);
                        }
                        else {
                            Team.updateCurrentSeasons(seasons, function (err, result) {
                                if (err) {
                                    logger.error(err);
                                    zerozero.proxyFailCallback(res, done);
                                }
                                else {
                                    done();
                                }
                            });
                        }
                    });
                }
            })
        }
    })
};
