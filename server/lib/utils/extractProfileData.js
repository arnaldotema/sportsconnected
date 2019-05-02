'use strict';

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const jwt = require('jsonwebtoken');

module.exports = (err, result, user) => {
  if (err) {
    return res.status(500).json({
      message: 'Error when getting profile.',
      error: err,
    });
  }
  if (!result) {
    return res.status(404).json({
      message: 'No such profile',
    });
  }

  const profile_info = JSON.parse(entities.decode(JSON.stringify(result)));

  // We don't want to store the sensitive information
  // such as the password in the JWT
  const body = {
    _id: user._id,
    email: user.email,
    profile_id: user.profile_id,
    user_type: user.user_type,
    avatar: profile_info.current_season.personal_info.avatar,
    name: profile_info.current_season.personal_info.name,
    team_id: profile_info.current_season.team
      ? profile_info.current_season.team.id
      : 'n/a',
    team_avatar: profile_info.current_season.team
      ? profile_info.current_season.team.avatar
      : 'n/a',
    team_acronym: profile_info.current_season.team
      ? profile_info.current_season.team.acronym
      : 'n/a',
    team_name: profile_info.current_season.team
      ? profile_info.current_season.team.name
      : 'n/a',
  };

  //Sign the JWT token and populate the payload with the user email, id and etc
  const token = jwt.sign({user: body}, 'top_secret');
  //Send back the token to the user
  return res.json({
    token: token,
    _id: body._id,
    email: body.email,
    profile_id: body.profile_id,
    user_type: body.user_type,
    avatar: body.avatar,
    name: body.name,
    team_id: body.team_id,
    team_avatar: body.team_avatar,
    team_acronym: body.team_acronym,
    team_name: body.team_name,
  });
};