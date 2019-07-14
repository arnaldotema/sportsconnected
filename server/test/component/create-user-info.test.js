"use strict";

const { assert } = require("chai");
const { api } = require("../utils");
const { startServer, stopServer } = require("./../../lib/app");
const User = require("../../lib/models/football_user");
const UserInfo = require("../../lib/models/football_user_info");
const UserInfoSeason = require("../../lib/models/football_user_info_season");
const Season = require("../../lib/models/football_season");
const Team = require("../../lib/models/football_team");

describe("Component test: POST /players", () => {
  before(async () => {
    await startServer();
  });

  after(async () => {
    await stopServer();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await UserInfo.deleteMany({});
    await Season.deleteMany({});
    await UserInfoSeason.deleteMany({});
    await Team.deleteMany({});
    console.log("Deleted UserInfo documents");
    console.log("Deleted UserInfoSeason documents");
    console.log("Deleted Season documents");
    console.log("Deleted Team documents");
  });

  it("Should post a userInfo and userInfoSeason and get it", async () => {
    const user = {
      profile_id: "",
      user_type: "football_user_info",
      email: "some@email.com",
      password: "somepasswordwithmorethan10chars"
    };

    const { body: newUser } = await api
      .post("/api/users")
      .set("Content-Type", "application/json")
      .send(user)
      .expect(201);

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

    const personalInfo = {
      name: "MockName",
      age: 20,
      number: 0,
      full_name: "MockName",
      positions: ["Avançado", "Médio"],
      height: 185,
      weight: 75,
      foot: "Direito",
      nationality: "Portugal",
      residence: "Londres"
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
      user_id: newUser._id,
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
      external_ids: {
        zerozero: 12345678910
      },
      personal_info: personalInfo, // api requisite
      season_id: newSeason._id, // api requisite
      team: teamId // api requisite
    };

    const { body: actualResponse } = await api
      .post("/api/players")
      .set("Content-Type", "application/json")
      .send(userInfo)
      .expect(201);

    const expectedResponse = {
      _id: actualResponse._id,
      updated_at: actualResponse.updated_at,
      created_at: actualResponse.created_at,
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
      ],
      user_id: newUser._id,
      followers: [],
      following: [],
      previous_seasons: [],
      recommendations: { list: [], top_5: [] },
      achievements: [],
      actions_regex: "",
      external_ids: {
        zerozero: 12345678910
      }
    };

    assert.deepEqual(actualResponse, {
      ...expectedResponse
    });
  });
});
