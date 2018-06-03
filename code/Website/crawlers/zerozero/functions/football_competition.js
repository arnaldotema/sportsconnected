const zerozero = require('../crawler');
const proxyHandler = require('../proxy_handler');
const logger = require('../../../logging');
const baseUris = require('../base_uris');
const format = require("string-template");
const footballTeam = require('../../../models/football_team');
const footballTeamCrawler = require('./football_team');
const footballMatch = require('../../../models/football_match');
const footballMatchCrawler = require('./football_match');

const updateCompetitionTeams = function (err, res, done){
    let teamIds = [];

    res.$('#edition_table tbody tr .text a').each(function() {
        let teamId = res.$(this).attr('href').match(/\d+/g)[0];

        zerozero.queue({
            uri:format(baseUris.TEAM_INFO, { team_id: teamId }),
            callback: proxyHandler.crawl,
            successCallback: footballTeamCrawler.updateTeamInfo,
            zerozeroId: teamId
        });

        teamIds.push(teamId);
    });

    logger.info("Edition Teams IDs: " + teamIds);

    done();
}

const updateCompetitionMatches = function (err, res, done){
    let matchesToSchedule = [];

    const test = res.$("#team_games tbody tr").each(function() {
        const matchDate = new Date(res.$(this.children[1]).html() + " " + res.$(this.children[2]).html());
        const matchId = res.$(this).attr("id");

        if(matchDate + 0.5 > Date.now()){
            matchesToSchedule.push({
                played: false,
                date: matchDate,
                external_ids:{
                    zerozero: matchId
                }
            })
        }
        else{
            zerozero.queue({
                uri:format(baseUris.MATCH_INFO, { match_id: matchId }),
                callback: proxyHandler.crawl,
                successCallback: footballMatchCrawler.processMatchInfo(),
                zerozeroId: matchId,
                matchDate: matchDate
            });
        }
    });

    footballMatch.insertMany(matchesToSchedule, function (err, matches) {
        console.log(matches);
        done();
    });
}

module.exports = {
    updateCompetitionTeams: updateCompetitionTeams,
    updateCompetitionMatches: updateCompetitionMatches
}
