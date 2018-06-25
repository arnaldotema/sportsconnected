const zerozero = require('../crawler');
const proxyHandler = require('../proxy_handler');
const logger = require('../../../logging');
const baseUris = require('../base_uris');
const format = require("string-template");
const footballCompetition = require('../../../models/football_competition');
const footballTeam = require('../../../models/football_team');
const footballTeamCrawler = require('./football_team');
const footballMatch = require('../../../models/football_match');
const footballMatchCrawler = require('./football_match');

const updateCompetitionInfo = function (err, res, done){
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

    const query = {"external_ids.zerozero": res.options.zerozeroId};

    footballCompetition.findOneAndUpdate(query, competition, { upsert:true, new:true, setDefaultsOnInsert: true }, function (err, result) {
        if (err) {
            logger.error(err);
            done();
        }
        else {

            logger.info("Updated competition", result._doc);

            zerozero.queue({
                uri:format(baseUris.COMPETITION_EDITION_MATCHES, { edition_id: res.options.zerozeroId }),
                priority: 1,
                callback: proxyHandler.crawl,
                successCallback: updateCompetitionMatches,
                zerozeroId: res.options.zerozeroId,
                competitionId: result._doc._id
            });

            res.options.competition = result._doc;

            updateCompetitionTeams(err, res, done)
        }
    });

}

const updateCompetitionTeams = function (err, res, done){
    let teamIds = [];

    res.$('#edition_table tbody tr .text a').each(function() {
        let teamId = res.$(this).attr('href').match(/\d+/g)[0];

        zerozero.queue({
            uri:format(baseUris.TEAM_INFO, { team_id: teamId }),
            priority: 2,
            callback: proxyHandler.crawl,
            successCallback: footballTeamCrawler.updateTeamInfo,
            zerozeroId: teamId,
            competition: res.options.competition
        });

        teamIds.push(teamId);
    });

    logger.info("Edition Teams IDs: ", teamIds);

    done();
}

const updateCompetitionMatches = function (err, res, done){
    let matchesToSchedule = [];

    const test = res.$("#team_games tbody tr").each(function() {
        const matchDate = new Date(res.$(this.children[1]).html() + " " + res.$(this.children[2]).html());
        const matchId = res.$(this).attr("id");

        if(matchId) {
            if (matchDate + 0.5 > Date.now()) {
                matchesToSchedule.push({
                    played: false,
                    date: matchDate,
                    competition: {
                        id: res.options.competitionId
                    },
                    external_ids: {
                        zerozero: matchId
                    }
                })
            }
            else {
                zerozero.queue({
                    uri: format(baseUris.MATCH_INFO, {match_id: matchId}),
                    callback: proxyHandler.crawl,
                    priority: 9,
                    successCallback: footballMatchCrawler.processMatchInfo,
                    zerozeroId: matchId,
                    matchDate: matchDate,
                    competitionId: res.options.competitionId
                });
            }
        }
    });

    footballMatch.insertMany(matchesToSchedule, function (err, matches) {
        logger.info("Matches not played: ", matches);
        done();
    });
}

module.exports = {
    updateCompetitionInfo: updateCompetitionInfo,
    updateCompetitionTeams: updateCompetitionTeams,
    updateCompetitionMatches: updateCompetitionMatches
}
