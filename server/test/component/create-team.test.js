"use strict";

const { assert } = require("chai");
const { api } = require("../utils");
const { startServer, stopServer } = require("./../../lib/app");
const Season = require("../../lib/models/football_season");
const Competition = require("../../lib/models/football_competition");
const TeamSeason = require("../../lib/models/football_team_season");
const Team = require("../../lib/models/football_team");

describe("Component test: POST /teams", () => {
  before(async () => {
    await startServer();
  });

  after(async () => {
    await stopServer();
  });

  beforeEach(async () => {
    await TeamSeason.remove({});
    await Team.remove({});
    await Season.remove({});
    await Competition.remove({});
    console.log("Deleted Season documents");
    console.log("Deleted Team documents");
    console.log("Deleted TeamSeason documents");
  });

  it("Should post a team and teamSeason and get it", async () => {
    // todo - complete tests

    const season = {
      name: "Mock Season",
      external_ids: {
        zerozero: 12345678910
      }
    };

    const { body: newSeason } = await api
      .post("/api/seasons")
      .set("Content-Type", "application/json")
      .send(season)
      .expect(201);

    const competition = {
      name: "Liga Portuguesa",
      avatar: "https://avatar.com",
      external_ids: {
        zerozero: 12345678910
      },
      previous_seasons: []
    };

    const { body: newCompetition } = await api
      .post("/api/competitions")
      .set("Content-Type", "application/json")
      .send(competition)
      .expect(201);

    /*const match = {};

    const { body: newMatch } = await api
      .post("/api/matches")
      .set("Content-Type", "application/json")
      .send(match)
      .expect(201);

    const team = {
      name: "MockName",
      acronym: "MockAcronym",
      avatar: "MockAvatar",
      full_name: "MockName",
      external_ids: {
        zerozero: 12345678910
      },
      standings: [
        {
          id: newSeason._id,
          competition_id: newCompetition._id,
          name: "MockStanding",
          avatar: "MockAvatar",
          position: 1,
          matches: 3,
          wins: 1,
          draws: 1,
          losses: 1,
          goals: 2,
          goals_taken: 2
        }
      ],
      matches: [
        {
          id: newMatch._id,
          date: Date,
          competition_season: {
            id: {
              type: Schema.Types.ObjectId,
              ref: "football_competition_season"
            },
            competition_id: newCompetition._id,
            name: String,
            avatar: String
          },
          home_team: {
            id: { type: Schema.Types.ObjectId, ref: "football_team_season" },
            team_id: { type: Schema.Types.ObjectId, ref: "football_team" },
            name: String,
            avatar: String,
            goals: Number
          },
          away_team: {
            id: { type: Schema.Types.ObjectId, ref: "football_team_season" },
            team_id: { type: Schema.Types.ObjectId, ref: "football_team" },
            name: String,
            avatar: String,
            goals: Number
          }
        }
      ],
      players: [
        {
          id: { type: Schema.Types.ObjectId, ref: "football_user_info_season" },
          user_info_id: {
            type: Schema.Types.ObjectId,
            ref: "football_user_info"
          },
          age: Number,
          number: String,
          name: String,
          avatar: String,
          nationality: String,
          positions: [String]
        }
      ],
      staff: [
        {
          id: { type: Schema.Types.ObjectId, ref: "football_user_info_season" },
          user_info_id: {
            type: Schema.Types.ObjectId,
            ref: "football_user_info"
          },
          name: String,
          avatar: String,
          nationality: String
        }
      ],
      media: [
        {
          _id: String,
          user_type: { type: String, enum: USER_TYPES },
          season_id: { type: Schema.Types.ObjectId, ref: "football_season" },
          title: { type: String, required: true },
          author: String,
          date: Date,
          image: String,
          text: { type: String, required: true },
          references: {
            leagues: [
              {
                name: String,
                id: { type: Schema.Types.ObjectId, ref: "football_competition" }
              }
            ],
            team: [
              {
                name: String,
                id: { type: Schema.Types.ObjectId, ref: "football_team" }
              }
            ],
            user: [
              {
                name: String,
                id: { type: Schema.Types.ObjectId, ref: "football_user_info" }
              }
            ]
          }
        }
      ],
      followers: [],
      following: [],
      tryouts: [
        {
          address: "MockAddress",
          age_group: "MockAddress",
          days: "MockAddress",
          time: "MockAddress",
          requirements: "MockAddress"
        },
        {
          address: "MockAddress2",
          age_group: "MockAgeGropup2",
          days: "MockDays2",
          time: "MockTime2",
          requirements: "MockRequirements2"
        }
      ],
      recommendations: { list: [], top_5: [] },
      additional_info: {
        site: "MockSite",
        email: "MockEmail",
        phone_Number: "MockPhoneNumber",
        address: "MockAddress",
        president: "MockPresident",
        vice_president: "MockVicePresident",
        sports_director: "MockDirector",
        number_of_teams: 1,
        number_of_athletes: 20,
        number_of_coaches: 2,
        number_of_physiotherapists: 2,
        number_of_grass_fields: 2,
        number_of_synthetic_fields: 1,
        number_of_locker_rooms: 5,
        sponsors: [
          {
            link: "MockLink",
            name: "MockName"
          },
          {
            link: "MockLink2",
            name: "MockName2"
          }
        ],
        other_sports: ["Sport1", "Sport2"]
      },
      previous_seasons: [],
      season_id: newSeason._id // api requisite
    };

    const { body: actualResponse } = await api
      .post("/api/teams")
      .set("Content-Type", "application/json")
      .send(team)
      .expect(201);

    const expectedResponse = {
      name: "MockName",
      acronym: "MockAcronym",
      avatar: "MockAvatar",
      full_name: "MockName",
      external_ids: {
        zerozero: 12345678910
      },
      followers: [],
      following: [],
      tryouts: [
        {
          address: "MockAddress",
          age_group: "MockAddress",
          days: "MockAddress",
          time: "MockAddress",
          requirements: "MockAddress"
        },
        {
          address: "MockAddress2",
          age_group: "MockAgeGropup2",
          days: "MockDays2",
          time: "MockTime2",
          requirements: "MockRequirements2"
        }
      ],
      recommendations: { list: [], top_5: [] },
      additional_info: {
        site: "MockSite",
        email: "MockEmail",
        phone_Number: "MockPhoneNumber",
        address: "MockAddress",
        president: "MockPresident",
        vice_president: "MockVicePresident",
        sports_director: "MockDirector",
        number_of_teams: 1,
        number_of_athletes: 20,
        number_of_coaches: 2,
        number_of_physiotherapists: 2,
        number_of_grass_fields: 2,
        number_of_synthetic_fields: 1,
        number_of_locker_rooms: 5,
        sponsors: [
          {
            link: "MockLink",
            name: "MockName"
          },
          {
            link: "MockLink2",
            name: "MockName2"
          }
        ],
        other_sports: ["Sport1", "Sport2"]
      },
      previous_seasons: [],
      _id: actualResponse._id,
      updated_at: actualResponse.updated_at,
      created_at: actualResponse.created_at,
      current_season: {
        season_id: newSeason._id,
        ...actualResponse.current_season
      }
    };

    assert.deepEqual(actualResponse, {
      ...expectedResponse,
      _id: actualResponse._id,
      updated_at: actualResponse.updated_at,
      created_at: actualResponse.created_at,
      current_season: {
        season_id: newSeason._id,
        ...actualResponse.current_season
      }
    });*/
  });
});
