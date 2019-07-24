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

  it("Should put a team and teamSeason and get it", async () => {
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

    const userID = ObjectId("123456789012345678901234");

    const { body: newTeam } = await api
      .post(`/api/teams`)
      .set("Content-Type", "application/json")
      .send({
        external_ids: {
          zerozero: 12345678910
        }
      })
      .expect(201);

    const now = Date.now();

    const currentSeason = {
      season_id: newSeason._id,
      standings: [
        {
          _id: newSeason._id,
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
          _id: ObjectId("123456789012345678911111").toString(),
          user_info_id: ObjectId("123456789012345678999999").toString(),
          age: 23,
          number: 12,
          name: "MockUser",
          avatar: "MockAvatar",
          nationality: "MockNationality",
          positions: ["MockPosition1", "MockPosition2"]
        }
      ],
      staff: [
        {
          _id: ObjectId("123456789012345678922444").toString(),
          user_info_id: ObjectId("123456789012345678983902").toString(),
          name: "MockCoach",
          avatar: "MockAvatar",
          nationality: "MockNationality"
        }
      ],
      media: [
        {
          _id: ObjectId("123456789012345678909090").toString(),
          user_type: "football_team",
          season_id: newSeason._id,
          author: {
            user_type: "football_user_info",
            name: "John Doe",
            id: ObjectId("123456789012345678900111").toString(),
            avatar: "https://www.avatar.com",
            team: {
              id: ObjectId("123456789012345678990222").toString(),
              acronym: "SLB",
              avatar: "https://www.avatar.com",
              name: "Sport Lisboa e Benfica"
            }
          },
          text:
            "John Doe does an amazing trick and amazes everyone with this bike goal!!",
          title: "Whatch this John Doe's amazing goal!!!",
          image: "https://www.avatar.com",
          tags: ["Cool", "goal", "SLB", "JohnDoe"]
        }
      ]
    };

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
      },
      current_season: currentSeason
    };

    const { body: actualResponse } = await api
      .put(`/api/teams/${newTeam._id}`)
      .set("Content-Type", "application/json")
      .send(team)
      .expect(200);

    const expectedResponse = {
      _id: newTeam._id,
      user_id: userID.toString(),
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
      created_at: actualResponse.created_at,
      current_season: actualResponse.current_season
    };

    assert.deepEqual(actualResponse, expectedResponse);

    const { body: actualNewTeam } = await api
      .get(`/api/teams/${newTeam._id}`)
      .set("Content-Type", "application/json")
      .expect(200);

    assert.deepEqual(actualNewTeam, {
      ...expectedResponse,
      current_season: currentSeason
    });
  });
});
