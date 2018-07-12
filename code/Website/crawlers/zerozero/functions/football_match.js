const zerozero = require('../crawler');
const proxyHandler = require('../proxy_handler');
const logger = require('../../../logging');
const baseUris = require('../base_uris');
const format = require("string-template");
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const footballPlayer = require('../../../models/football_user_info');
const footballMatch = require('../../../models/football_match');
const footballTeam = require('../../../models/football_team');

function initializeMatchModel(match, res, cb){

    //Competition

    let match = res.options.match;

    match.competition.name = res.$("#matchedition .name span a").html() ?
        res.$("#matchedition .name span a").html() :
        '';

    match.competition.phase = res.$("#matchedition .information span")[0] ?
        res.$(res.$("#matchedition .information span")[0]).html():
        '';

    match.competition.avatar = res.$("#matchedition .profile_picture img") ?
        "http://www.zerozero.pt" + res.$("#matchedition .profile_picture img").attr("href"):
        '';

    //Misc

    match.referee = res.$(".frame .entity .text a") ?
        res.$(".frame .entity .text a").html():
        '';

    match.stadium = res.$("#stadium .name a") ?
        res.$("#stadium .name a").html() :
        '';

    //Duration (went to overtime?)

    match.duration = res.$(".extratime").length == 0 ?
        90 :
        120;

    // Teams

    let homeZeroZeroId = res.$("#page_header .info .content .home .team a").length > 0 ?
        res.$("#page_header .info .content .home .team a").attr('href').match(/\d+/g)[0] :
        0;

    let awayZeroZeroId = res.$("#page_header .info .content .away .team a").length > 0 ?
        res.$("#page_header .info .content .away .team a").attr('href').match(/\d+/g)[0] :
        0;

    footballTeam.getMatchTeamsByZeroZeroId(homeZeroZeroId, awayZeroZeroId, function (err, result) {
        if (err) {
            logger.error(err);
        }
        else {
            logger.info("Successfully fetched match teams", result);

            let home_team = result[0].home_team;
            let away_team = result[0].away_team;

            if(home_team){
                match.home_team.id = home_team._id;
                match.home_team.name = home_team.name;
                match.home_team.avatar = home_team.avatar;
            }

            if(away_team){
                match.away_team.id = away_team._id;
                match.away_team.name = away_team.name;
                match.away_team.avatar = away_team.avatar;
            }

            cb(match, res);
        }
    })
}

function processMatchIds(match, res, cb){
    // User_Infos

    let homeTeam = {
        main_lineup: [],
        reserves: [],
        staff: []
    };

    let awayTeam = {
        main_lineup: [],
        reserves: [],
        staff: []
    };

    const report = res.$("#game_report .column_300");

    if(report.length == 0){
        logger.error("Match with zerozero id: " + res.options.zerozeroId + " has no report");
    }
    else{
        res.$(report[0]).find(".player .name .text a").each(function() {
            homeTeam.main_lineup.push(+res.$(this).attr('href').match(/\d+/g)[0]);
        });
        res.$(report[1]).find(".player .name .text a").each(function() {
            awayTeam.main_lineup.push(+res.$(this).attr('href').match(/\d+/g)[0]);
        });
        res.$(report[2]).find(".player .name .text a").each(function() {
            homeTeam.reserves.push(+res.$(this).attr('href').match(/\d+/g)[0]);
        });
        res.$(report[3]).find(".player .name .text a").each(function() {
            awayTeam.reserves.push(+res.$(this).attr('href').match(/\d+/g)[0]);
        });
        res.$(report[4]).find(".player .name .text a").each(function() {
            homeTeam.staff.push(+res.$(this).attr('href').match(/\d+/g)[0]);
        });
        res.$(report[5]).find(".player .name .text a").each(function() {
            awayTeam.staff.push(+res.$(this).attr('href').match(/\d+/g)[0]);
        });
    }

    match.home_team.main_lineup = homeTeam.main_lineup;
    match.home_team.reserves = homeTeam.reserves;
    match.home_team.staff = homeTeam.staff;

    match.away_team.main_lineup = awayTeam.main_lineup;
    match.away_team.reserves = awayTeam.reserves;
    match.away_team.staff = awayTeam.staff;

    footballPlayer.getMatchUserInfos(homeTeam, awayTeam, function (err, result) {
        if (err) {
            logger.error(err);
        }
        else {
            logger.info("Successfully fetched match user infos", result);

            cb(match, res);
        }
    })
}

function processMatchPlayers(match, res){

}

function processMatchTeams(match, res){
    let homeZeroZeroId = 0;
    let awayZeroZeroId = 0;

    //Home team

    match.home_team.name = res.$(".info .home .team a") ?
        res.$(".info .home .team a").html().split(" <span")[0] :
        '';

    match.home_team.avatar = res.$("#logo_home img").attr("src") ?
        "http://www.zerozero.pt" + res.$("#logo_home img").attr("href") :
        '';

    res.$(".info .home .scorers .time").each(function(){
        var number = res.$(this).html().trim();
        if(number.split(" ").length > 0){
            match.home_team.goals = match.home_team.goals.concat(number.split(" "));
        }
        else{
            match.home_team.goals = match.home_team.goals.push(number);
        }
    });

    const home_goals = match.home_team.goals.length;

    homeZeroZeroId = res.$(".info .home .team a") ?
        res.$(".info .home .team a").attr("href").match(/equipa\.php\?id=\d+/g)[0].split("=")[1] :
        0;

    //Away team

    match.away_team.name = res.$(".info .away .team a") ?
        res.$(".info .away .team a").html().split(" <span")[0] :
        '';

    match.away_team.avatar = res.$("#logo_away img").attr("src") ?
        "http://www.zerozero.pt" + res.$("#logo_away img").attr("href") :
        '';

    res.$(".info .away .scorers .time").each(function(){
        var number = res.$(this).html().trim();
        if(number.split(" ").length > 0){
            match.away_team.goals = match.away_team.goals.concat(number.split(" "));
        }
        else{
            match.away_team.goals = match.away_team.goals.push(number);
        }
    });

    const away_goals = match.away_team.goals.length;

    awayZeroZeroId = res.$(".info .away .team a") ?
        res.$(".info .away .team a").attr("href").match(/equipa\.php\?id=\d+/g)[0].split("=")[1] :
        0;

    footballTeam.bulkWrite(
        [
            {
                updateOne: {
                    filter: {
                        "external_ids.zerozero": homeZeroZeroId,
                        "current_season.standings.id": res.options.competitionId
                    },
                    update: {
                        $set: {
                            "current_season.standings.$.position": res.options.homePosition,
                        },
                        $inc : {
                            "current_season.standings.$.matches" : 1,
                            "current_season.standings.$.wins" : home_goals > away_goals ? 1 : 0,
                            "current_season.standings.$.draws" : home_goals == away_goals ? 1 : 0,
                            "current_season.standings.$.losses" : home_goals < away_goals ? 1 : 0,
                            "current_season.standings.$.goals" : home_goals,
                            "current_season.standings.$.goals_taken" : away_goals
                        }
                    }
                }
            },
            {
                updateOne: {
                    filter: {
                        "external_ids.zerozero": awayZeroZeroId,
                        "current_season.standings.id": res.options.competitionId
                    },
                    update: {
                        $set: {
                            "current_season.standings.$.position": res.options.awayPosition,
                        },
                        $inc : {
                            "current_season.standings.$.matches" : 1,
                            "current_season.standings.$.wins" : away_goals > home_goals ? 1 : 0,
                            "current_season.standings.$.draws" : away_goals == home_goals ? 1 : 0,
                            "current_season.standings.$.losses" : away_goals < home_goals ? 1 : 0,
                            "current_season.standings.$.goals" : away_goals,
                            "current_season.standings.$.goals_taken" : home_goals
                        }
                    }
                }
            }
        ],
        {},
        function (err, result) {
            if (err) {
                logger.error(err);
            }
            else {
                logger.info("Successfully updated team game", result);
            }
    });
}

function processMatchCompetition(match, res){

}

const processMatchInfo = function (err, res, done){
    let match = {
        played: false,
        players_processed: false,
        competition_processed: false,
        teams_processed: false,
        external_ids: {
            zerozero: res.options.zerozeroId
        },
        date: res.options.matchDate,
        duration: 90,
        stadium: '',
        referee: '',
        competition: {
            name: '',
            phase: '',
            avatar: '',
            id: res.options.competitionId
        },
        home_team: {
            id: '',
            name: '',
            avatar: '',
            goals: [],
            main_lineup: [],
            reserves: [],
            coach: {
                name: '',
                avatar: '',
                id: ''
            }
        },
        away_team: {
            id: '',
            name: '',
            avatar: '',
            goals: [],
            main_lineup: [],
            reserves: [],
            coach: {
                name: '',
                avatar: '',
                id: ''
            }
        }
    };

    initializeMatchModel(match, res, function(match,res) {
        processMatchIds(match, res, function(match,res) {
            processMatchPlayers(match, res);
            processMatchTeams(match, res);
            processMatchCompetition(match, res);
            done();
        })
    });
}

module.exports = {
    processMatchInfo: processMatchInfo
}
