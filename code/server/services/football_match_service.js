'use strict';
const _ = require('underscore');

function getLastPlayedMatchesByTeamId(teamId, nMatches, cb) {
    this.find({
        $or: [
            {home_team: {id: teamId}},
            {home_team: {id: teamId}}
        ]
    })
        .and({played: true})
        .select('date ' +
            'duration ' +
            'stadium ' +
            'referee ' +
            'competition_season.name ' +
            'competition_season.avatar competition_season.phase' +
            'home_team.name' +
            'home_team.avatar' +
            'home_team.goals' +
            'away_team.name' +
            'away_team.avatar' +
            'away_team.goals')
        .limit(nMatches)
        .sort({date: 'desc'})
        .exec((err, matches) => {
            cb(err, matches);
        })
}

function getNextMatchesByTeamId(teamId, nMatches, cb) {
    this.find({
        $or: [
            {home_team: {id: teamId}},
            {home_team: {id: teamId}}
        ]
    })
        .and({played: false})
        .select('date ' +
            'duration ' +
            'stadium ' +
            'referee ' +
            'competition_season.name ' +
            'competition_season.avatar competition_season.phase' +
            'home_team.name' +
            'home_team.avatar' +
            'home_team.goals' +
            'away_team.name' +
            'away_team.avatar' +
            'away_team.goals')
        .limit(nMatches)
        .sort({date: 'asc'})
        .exec((err, matches) => {
            cb(err, matches);
        })
}

function getMissingMatches(matchIds, cb) {
    this.find({"external_ids.zerozero": {'$in': matchIds}}, function (err, matches) {
        if (matches && !err) {
            matches = _.difference(matchIds, matches.map(match => match.external_ids.zerozero))
        }
        cb(err, matches);
    });
}

function updateAndReturnByZeroZeroId(zerozero_id, match, cb) {
    const query = {"external_ids.zerozero": zerozero_id};
    this.findOneAndUpdate(query, match, {upsert: true, new: true, setDefaultsOnInsert: true}, cb);
}

function insertFutureMaches(matches, cb) {
    this.insertMany(matches, cb);
}

module.exports = {
    updateAndReturnByZeroZeroId,
    getLastPlayedMatchesByTeamId,
    getNextMatchesByTeamId,
    getMissingMatches,
    insertFutureMaches
};
