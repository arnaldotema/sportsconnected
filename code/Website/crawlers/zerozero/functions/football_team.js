const zerozero = require('../crawler');
const proxyHandler = require('../proxy_handler');
const logger = require('../../../logging');
const baseUris = require('../base_uris');
var format = require("string-template");
const footballTeam = require('../../../models/football_team');
const footballMatchCrawler = require('../functions/football_match');
const footballCompetition = require('../../../models/football_competition');
const footballUserInfoCrawler = require('../functions/football_user_info');


const updateTeamInfo = function (err, res, done){

    const team = {
        acronym: '',
        avatar: '',
        name: '',
        full_name: '',
        external_ids: {
            zerozero: res.options.zerozeroId
        }
    };

    team.acronym = res.$("#page_header .factsheet .name").html() ?
        res.$("#page_header .factsheet .name").html():
        '';

    team.avatar = res.$("#page_header .logo img") ?
        'https://www.zerozero.pt/' + res.$("#page_header .logo img")[0].attribs["data-cfsrc"] :
        '';

    team.name = res.$("#page_header .factsheet .name").html() ?
        res.$("#page_header .factsheet .name").html():
        '';

    team.fullName = res.$("#entity_bio .bio")[0] ?
        res.$("#entity_bio .bio")[0].children[1].data:
        '';

    logger.info("Team Info:", team);

    const query = {"external_ids.zerozero": res.options.zerozeroId};

    footballTeam.findOneAndUpdate(query, team, { upsert:true, new:true, setDefaultsOnInsert: true }, function (err, result) {
        if (err) {
            logger.error(err);
            done();
        }
        else {
            logger.info("Successfully updated team " + result._doc);

            if(res.options.competition){
                res.options.team = result._doc;
                cascadeTeamUpdates(res, done);
            }
            else{
                done();
            }
        }
    });
};

function cascadeTeamUpdates(res, done){
    footballTeam.addCompetitionToTeam(res.options.team._id, res.options.competition,  function (err, result) {
        if (err) {
            logger.error("Error when adding competition to team:", err);
            done();
        }
        else {
            logger.info("Successfully added competition " + res.options.competition.name + " to team " + res.options.team.name);

            footballCompetition.addTeamToCompetition(res.options.competition._id, res.options.team, function (err, result) {
                if (err) {
                    logger.error("Error when adding team to competition:", err);
                    done();
                }
                else {
                    logger.info("Successfully added team " + res.options.team.name + " to competition " + res.options.competition.name);
                    processAllTeamPlayers(res, done);
                }
            });
        }
    });
}

function processAllTeamPlayers(res, done){
    let playerIds = [];

    res.$("#team_squad .staff .name .micrologo_and_text .text a").each(function() {
        let playerId = res.$(this).attr('href').match(/\d+/g)[0]

        zerozero.queue({
            uri:format(baseUris.PLAYER_INFO, { player_id: playerId }),
            priority: 3,
            callback: proxyHandler.crawl,
            successCallback: footballUserInfoCrawler.updateUserInfo,
            proxyFailCallback: zerozero.proxyFailCallback,
            zerozeroId: playerId,
            competition: res.options.competition,
            team: res.options.team
        });

        playerIds.push(playerId);
    });

    logger.info("Team Player IDs in processing: " + playerIds);

    done();

}

//not used, may be useful in the future...
const processAllTeamGames = function (err, res, done){
    let matchIds = [];

    res.$("#team_games table tr .result a").each(function() {
        let matchId = res.$(this).attr('href').match(/\d+/g)[0];
        let seasonId = res.$(this).attr('href').match(/\d+/g)[1];

        zerozero.queue({
            uri:format(baseUris.MATCH_INFO, { match_id: matchId, season_id: seasonId }),
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

module.exports = {
    updateTeamInfo: updateTeamInfo,
    processAllTeamGames: processAllTeamGames
}
