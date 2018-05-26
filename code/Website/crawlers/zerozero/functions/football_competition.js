const zerozero = require('../crawler');
const proxyHandler = require('../proxy_handler');
const logger = require('../../../logging');
const baseUris = require('../base_uris');
const format = require("string-template");
const footballTeam = require('../../../models/football_team');
const footballTeamCrawler = require('./football_team');

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

module.exports = {
    updateCompetitionTeams: updateCompetitionTeams
}
