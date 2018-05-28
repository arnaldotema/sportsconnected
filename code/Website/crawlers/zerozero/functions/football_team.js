const zerozero = require('../crawler');
const proxyHandler = require('../proxy_handler');
const logger = require('../../../logging');
const baseUris = require('../base_uris');
var format = require("string-template");
const footballTeam = require('../../../models/football_team');
const footballMatchCrawler = require('../functions/football_match');
const footballUserInfoCrawler = require('../functions/football_user_info');

const updateTeamInfo = function (err, res, done){
    const acronym = res.$("#page_header .factsheet .name").html() ?
        res.$("#page_header .factsheet .name").html():
        '';

    const avatar = res.$("#page_header .logo img").attr("src") ?
        'https://www.zerozero.pt/' + res.$("#page_header .logo img").attr("src") :
        '';

    const name = res.$("#page_header .factsheet .name").html() ?
        res.$("#page_header .factsheet .name").html():
        '';

    const fullName = res.$("#entity_bio .bio")[0] ?
        res.$("#entity_bio .bio")[0].children[1].data:
        '';

    const team = {
        acronym: acronym,
        avatar: avatar,
        name: name,
        full_name: fullName,
        external_ids: {
            zerozero: res.options.zerozeroId,
        }
    };

    logger.info("Team Info:")
    logger.info(team);

    let query = {"external_ids.zerozero": res.options.zerozeroId};

    footballTeam.update(query, team, { upsert:true, setDefaultsOnInsert: true }, function (err, result) {
        if (err) {
            logger.error(err);
            done();
        }
        else {
            if(result.upserted){
                logger.info("Successfully created team " + res.options.zerozeroId);
            }
            else {
                logger.info("Successfully updated team " + res.options.zerozeroId);
            }

            processAllTeamPlayers(err, res, done);
        }
    });
};


const processAllTeamPlayers = function (err, res, done){
    let playerIds = [];

    res.$("#team_squad .staff .name .micrologo_and_text .text a").each(function() {
        let playerId = res.$(this).attr('href').match(/\d+/g)[0]

        zerozero.queue({
            uri:format(baseUris.PLAYER_INFO, { player_id: playerId }),
            callback: proxyHandler.crawl,
            successCallback: footballUserInfoCrawler.updateUserInfo,
            proxyFailCallback: zerozero.proxyFailCallback,
            zerozeroId: playerId
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
        let matchId = res.$(this).attr('href').match(/\d+/g)[0]

        zerozero.queue({
            uri:format(baseUris.MATCH_INFO, { match_id: matchId }),
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
    processAllTeamGames: processAllTeamGames,
    processAllTeamPlayers: processAllTeamPlayers
}
