"use strict";

const sinon = require("sinon");
const passport = require("passport");
const { assert } = require("chai");
const { api } = require("../utils");
const { startServer, stopServer } = require("./../../lib/app");
const User = require("../../lib/models/football_user");
const UserInfo = require("../../lib/models/football_user_info");
const UserInfoSeason = require("../../lib/models/football_user_info_season");
const Team = require("../../lib/models/football_team");

describe("Component test: POST /players", () => {
  before(async () => {
    await startServer();
    //todo: stub authenticate
    // sinon.stub(authenticate).returns(() => {});
  });

  after(async () => {
    await stopServer();
  });

  beforeEach(async () => {
    await User.remove({});
    await UserInfo.remove({});
    await UserInfoSeason.remove({});
    await Team.remove({});
    console.log("Deleted UserInfo documents");
  });

  it("Should post a userInfo and userInfoSeason and get it", async () => {
    const mockDate = new Date().toISOString();

    const user = {
      profile_id: "",
      user_type: "football_user_info",
      email: "some@email.com",
      password: "somepasswordwithmorethan10chars",
      last_login: mockDate,
      subscription_expiration: mockDate
    };

    const { body: nUser } = await api
      .post("/api/users")
      .set("Content-Type", "application/json")
      .send(user)
      .expect(201);

    const season = {
      name: "Mock Season",
      updated_at: mockDate,
      external_ids: {
        zerozero: 12345678910
      }
    };

    const { body: nSeason } = await api
      .post("/api/seasons")
      .set("Content-Type", "application/json")
      .send(season)
      .expect(201);

    const personalInfo = {
      name: "MockName",
      age: 20,
      // avatar: "MockAvatar"
      number: 0,
      full_name: "MockName",
      positions: ["Avançado", "Médio"],
      height: 185,
      weight: 75,
      date_of_birth: mockDate,
      foot: "Direito",
      nationality: "Portugal",
      residence: "Londres"
      // updated_at: mockDate
    };

    const mockTeam = new Team({
      acronym: "MockAcronym",
      avatar: "MockAvatar",
      name: "MockName",
      full_name: "MockName",
      external_ids: {
        zerozero: 12345678910
      }
    });

    const { _id: teamId } = await mockTeam.save();

    const userInfo = {
      user_id: nUser._id,
      followers: [],
      following: [],
      previous_seasons: [],
      skill_set: [
        { name: "Power", endorsements: [] },
        { name: "Speed", endorsements: [] }
      ],
      recommendations: { list: [], top_5: [] },
      achievements: [],
      actions_regex: "",
      created_at: mockDate,
      updated_at: mockDate,
      external_ids: {
        zerozero: 12345678910
      },
      personal_info: personalInfo, // api requisite
      season_id: nSeason._id, // api requisite
      team: teamId // api requisite
    };

    const expectedResponse = {
      user_id: userInfo.user_id,
      followers: userInfo.followers,
      following: userInfo.following,
      previous_seasons: userInfo.previous_seasons,
      skill_set: userInfo.skill_set,
      recommendations: userInfo.recommendations,
      achievements: userInfo.achievements,
      actions_regex: userInfo.actions_regex,
      created_at: userInfo.created_at,
      updated_at: userInfo.updated_at,
      external_ids: userInfo.external_ids
    };

    const { body: actualResponse } = await api
      .post("/api/players")
      .set("Content-Type", "application/json")
      .send(userInfo)
      .expect(201);

    assert.deepEqual(actualResponse, {
      ...expectedResponse,
      __v: 0,
      _id: actualResponse._id,
      type: actualResponse.type,
      updated_at: actualResponse.updated_at,
      current_season: actualResponse.current_season,
      skill_set: [
        {
          _id: actualResponse.skill_set[0]._id,
          name: "Power",
          endorsements: []
        },
        {
          _id: actualResponse.skill_set[1]._id,
          name: "Speed",
          endorsements: []
        }
      ]
    });
  });
});
