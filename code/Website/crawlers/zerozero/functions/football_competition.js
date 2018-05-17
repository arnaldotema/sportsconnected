const zerozero = require('../crawler');
const logger = require('../../../logging');
const baseUris = require('../base_uris');
const format = require("string-template");
const footballTeam = require('../../../models/football_team');
const footballTeamCrawler = require('./football_team');

module.exports = {
    updateCompetitionTeams: function (err, res, done){
        let teamIds = [];

        res.$('#edition_table tbody tr .text a').each(function() {
            teamIds.push(res.$(this).attr('href').match(/\d+/g)[0]);
        });

        logger.info("Edition Teams: " + teamIds);

        footballTeam.getMissingTeams(teamIds, function(err, teams) {
            logger.info("Missing Edition Teams: " + teams);
            for ( let teamId of teams){
                zerozero.queue({
                    uri:format(baseUris.TEAM_INFO, { id_team: teamId }),
                    callback: footballTeamCrawler.processTeamInfo,
                    zerozeroId: teamId
                });
            }
            done();
        });
    }
}
