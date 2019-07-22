"use strict";

const { assert } = require("chai");
const { api } = require("../utils");
const { startServer, stopServer } = require("./../../lib/app");
const Season = require("../../lib/models/football_season");
const Competition = require("../../lib/models/football_competition");
const TeamSeason = require("../../lib/models/football_team_season");
const Team = require("../../lib/models/football_team");
const { ObjectId } = require("mongoose").mongo;

describe("Component test: POST /teams", () => {
  before(async () => {
    await startServer();
  });

  after(async () => {
    await stopServer();
  });

  beforeEach(async () => {
    await TeamSeason.deleteMany({});
    await Team.deleteMany({});
    await Season.deleteMany({});
    await Competition.deleteMany({});
    console.log("Deleted Season documents");
    console.log("Deleted Team documents");
    console.log("Deleted TeamSeason documents");
  });

  it("Should post a team and teamSeason and get it", async () => {
    const userID = ObjectId("123456789012345678901234");

    const team = {
      user_id: userID.toString(), // team's user ID
      name: "MockName",
      full_name: "MockName",
      acronym: "MockAcronym",
      avatar: "MockAvatar",
      previous_seasons: [],
      tryouts: [
        {
          _id: ObjectId("123456789012345678901231").toString(),
          address: "MockAddress",
          age_group: "MockAddress",
          days: "MockAddress",
          time: "MockAddress",
          requirements: "MockAddress"
        },
        {
          _id: ObjectId("123456789012345678901232").toString(),
          address: "MockAddress2",
          age_group: "MockAgeGropup2",
          days: "MockDays2",
          time: "MockTime2",
          requirements: "MockRequirements2"
        }
      ],
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
            _id: ObjectId("123456789012345678901233").toString(),
            link: "MockLink",
            name: "MockName"
          },
          {
            _id: ObjectId("123456789012345678901235").toString(),
            link: "MockLink2",
            name: "MockName2"
          }
        ],
        other_sports: ["Sport1", "Sport2"]
      },
      followers: [],
      following: [],
      recommendations: { list: [], top_5: [] },
      external_ids: {
        zerozero: 12345678910
      }
      /*

      For PUT tests

      season_id: newSeason._id,
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
      matches: [],
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
      ]
      */
    };

    const { body: actualResponse } = await api
      .post("/api/teams")
      .set("Content-Type", "application/json")
      .send(team)
      .expect(201);

    const expectedResponse = {
      _id: actualResponse._id,
      user_id: userID.toString(), // team's user ID
      name: "MockName",
      full_name: "MockName",
      acronym: "MockAcronym",
      avatar: "MockAvatar",
      previous_seasons: [],
      tryouts: [
        {
          _id: ObjectId("123456789012345678901231").toString(),
          address: "MockAddress",
          age_group: "MockAddress",
          days: "MockAddress",
          time: "MockAddress",
          requirements: "MockAddress"
        },
        {
          _id: ObjectId("123456789012345678901232").toString(),
          address: "MockAddress2",
          age_group: "MockAgeGropup2",
          days: "MockDays2",
          time: "MockTime2",
          requirements: "MockRequirements2"
        }
      ],
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
            _id: ObjectId("123456789012345678901233").toString(),
            link: "MockLink",
            name: "MockName"
          },
          {
            _id: ObjectId("123456789012345678901235").toString(),
            link: "MockLink2",
            name: "MockName2"
          }
        ],
        other_sports: ["Sport1", "Sport2"]
      },
      followers: [],
      following: [],
      recommendations: { list: [], top_5: [] },
      external_ids: {
        zerozero: 12345678910
      },
      updated_at: actualResponse.updated_at,
      created_at: actualResponse.created_at
    };

    assert.deepEqual(actualResponse, expectedResponse);
    /*

    For PUT tests

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
      }
    };

    const { body: newCompetition } = await api
      .post("/api/competitions")
      .set("Content-Type", "application/json")
      .send(competition)
      .expect(201);

    */
  });
});
