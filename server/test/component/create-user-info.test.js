"use strict";

const Chance = require("chance");
const { assert } = require("chai");
const { api } = require("../utils");
const { startServer, stopServer } = require("./../../lib/app");
const User = require("../../lib/models/football_user");
const UserInfo = require("../../lib/models/football_user_info");
const UserInfoSeason = require("../../lib/models/football_user_info_season");
const Season = require("../../lib/models/football_season");
const Team = require("../../lib/models/football_team");

const chance = new Chance();

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
      number: "0",
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

  it("Should update a userInfo and get it", async () => {
    const userId = chance.string({ length: 24, pool: "1" });
    const userDocuemt = new User({
      _id: userId,
      profile_id: "",
      user_type: "football_user_info",
      email: "some@email.com",
      password: "somepasswordwithmorethan10chars"
    });
    await userDocuemt.save();

    const seasonId = chance.string({ length: 24, pool: "2" });
    const seasonDocument = new Season({
      _id: seasonId,
      name: "Mock Season",
      external_ids: {
        zerozero: 12345678910
      }
    });
    await seasonDocument.save();

    const teamId = chance.string({ length: 24, pool: "3" });
    const team = new Team({
      _id: teamId,
      acronym: "MockAcronym",
      avatar: "MockAvatar",
      name: "MockName",
      full_name: "MockName",
      external_ids: {
        zerozero: 12345678910
      }
    });

    await team.save();

    const userInfoId = chance.string({ length: 24, pool: "4" });
    const personalInfo = {
      name: "MockName",
      age: 20,
      number: "0",
      full_name: "MockName",
      positions: ["Avançado", "Médio"],
      height: 185,
      weight: 75,
      foot: "Direito",
      nationality: "Portugal",
      residence: "Londres"
    };

    const userInfo = {
      _id: userInfoId,
      user_id: userId,
      followers: [],
      following: [],
      previous_seasons: [],
      skill_set: [
        {
          _id: chance.string({ length: 24, pool: "6" }),
          name: "Power",
          endorsements: []
        },
        {
          _id: chance.string({ length: 24, pool: "7" }),
          name: "Speed",
          endorsements: []
        }
      ],
      recommendations: { list: [], top_5: [] },
      achievements: [],
      actions_regex: "",
      external_ids: {
        zerozero: 12345678910
      },
      personal_info: personalInfo,
      season_id: seasonId,
      team: teamId,
      type: 1
    };

    // Create new userInfo

    await api
      .post("/api/players")
      .set("Content-Type", "application/json")
      .send(userInfo)
      .expect(201);

    // Update the userInfo

    const mockTeamSeasonId = chance.string({ length: 24, pool: "5" });

    const { body: actualResponse } = await api
      .put(`/api/players/${userInfoId}`)
      .set("Content-Type", "application/json")
      .send({
        personal_info: {
          name: "A different name",
          age: 20,
          number: "0",
          full_name: "A different full name",
          positions: ["Avançado"],
          height: 185,
          weight: 75,
          foot: "Esquerdo",
          nationality: "UK",
          residence: "Lisboa"
        },
        team: {
          id: mockTeamSeasonId,
          team_id: teamId,
          acronym: "Another team acronym",
          avatar: "Another team avatar",
          name: "Another team name"
        }
      })
      .expect(200);

    const expectedResponse = {
      _id: userInfoId,
      user_id: userId,
      followers: [],
      following: [],
      previous_seasons: [],
      skill_set: [
        {
          _id: chance.string({ length: 24, pool: "6" }),
          name: "Power",
          endorsements: []
        },
        {
          _id: chance.string({ length: 24, pool: "7" }),
          name: "Speed",
          endorsements: []
        }
      ],
      recommendations: { list: [], top_5: [] },
      achievements: [],
      actions_regex: "",
      external_ids: {
        zerozero: 12345678910
      },
      current_season: {
        personal_info: {
          name: "A different name",
          age: 20,
          number: "0",
          full_name: "A different full name",
          positions: ["Avançado"],
          height: 185,
          weight: 75,
          foot: "Esquerdo",
          nationality: "UK",
          residence: "Lisboa",
          updated_at: actualResponse.current_season.personal_info.updated_at
        },
        team: {
          id: mockTeamSeasonId,
          team_id: teamId,
          acronym: "Another team acronym",
          avatar: "Another team avatar",
          name: "Another team name"
        },
        stats: [],
        media: [],
        matches: []
      },
      updated_at: actualResponse.updated_at,
      created_at: actualResponse.created_at
    };

    assert.deepEqual(actualResponse, expectedResponse);
  });

  it("Should get a userInfo by id", async () => {
    const userId = chance.string({ length: 24, pool: "1" });
    const userDocument = new User({
      _id: userId,
      profile_id: "",
      user_type: "football_user_info",
      email: "some@email.com",
      password: "somepasswordwithmorethan10chars"
    });
    await userDocument.save();

    const seasonId = chance.string({ length: 24, pool: "2" });
    const seasonDocument = new Season({
      _id: seasonId,
      name: "Mock Season",
      external_ids: {
        zerozero: 12345678910
      }
    });
    await seasonDocument.save();

    const teamId = chance.string({ length: 24, pool: "3" });
    const team = new Team({
      _id: teamId,
      acronym: "MockAcronym",
      avatar: "MockAvatar",
      name: "MockName",
      full_name: "MockName",
      external_ids: {
        zerozero: 12345678910
      }
    });

    await team.save();

    const userInfoId = chance.string({ length: 24, pool: "4" });
    const userInfoSeasonId = chance.string({ length: 24, pool: "8" });
    const personalInfo = {
      name: "MockName",
      age: 20,
      number: "0",
      full_name: "MockName",
      positions: ["Avançado", "Médio"],
      height: 185,
      weight: 75,
      foot: "Direito",
      nationality: "Portugal",
      residence: "Londres"
    };

    const userInfo = {
      _id: userInfoId,
      user_id: userId,
      current_season: userInfoSeasonId,
      followers: [],
      following: [],
      previous_seasons: [],
      skill_set: [
        {
          _id: chance.string({ length: 24, pool: "6" }),
          name: "Power",
          endorsements: []
        },
        {
          _id: chance.string({ length: 24, pool: "7" }),
          name: "Speed",
          endorsements: []
        }
      ],
      recommendations: { list: [], top_5: [] },
      achievements: [],
      actions_regex: "",
      external_ids: {
        zerozero: 12345678910
      },
      personal_info: personalInfo,
      season_id: seasonId,
      team: teamId,
      type: 1
    };

    const userInfoDocument = new UserInfo(userInfo);
    await userInfoDocument.save();

    const userInfoSeason = {
      _id: userInfoSeasonId,
      personal_info: {
        name: "Some name"
      },
      user_info_id: userId,
      external_ids: {
        zerozero: 12345678910
      }
    };

    const userInfoSeasonDocument = new UserInfoSeason(userInfoSeason);
    await userInfoSeasonDocument.save();

    const { body: actualResponse } = await api
      .get(`/api/players/${userInfoId}`)
      .set("Content-Type", "application/json")
      .expect(200);

    const expectedResponse = {
      _id: userInfoId,
      user_id: userId,
      followers: [],
      following: [],
      previous_seasons: [],
      skill_set: [
        {
          _id: chance.string({ length: 24, pool: "6" }),
          name: "Power",
          endorsements: []
        },
        {
          _id: chance.string({ length: 24, pool: "7" }),
          name: "Speed",
          endorsements: []
        }
      ],
      recommendations: { list: [], top_5: [] },
      achievements: [],
      actions_regex: "",
      external_ids: {
        zerozero: 12345678910
      },
      current_season: {
        external_ids: {
          zerozero: 12345678910
        },
        matches: [],
        media: [],
        personal_info: {
          name: "Some name",
          positions: [],
          updated_at: actualResponse.current_season.personal_info.updated_at
        },
        stats: []
      },
      created_at: actualResponse.created_at,
      updated_at: actualResponse.updated_at
    };
    assert.deepEqual(actualResponse, expectedResponse);
  });

  it("Should list userInfos", async () => {
    const userInfo1Id = chance.string({ length: 24, pool: "1" });
    const userInfo1 = {
      _id: userInfo1Id,
      type: 1,
      external_ids: {
        zerozero: 111
      },
      skill_set: [
        {
          _id: chance.string({ length: 24, pool: "2" }),
          name: "Power",
          endorsements: []
        },
        {
          _id: chance.string({ length: 24, pool: "3" }),
          name: "Speed",
          endorsements: []
        }
      ]
    };
    const userInfo1Document = new UserInfo(userInfo1);
    await userInfo1Document.save();

    const userInfo2Id = chance.string({ length: 24, pool: "4" });
    const userInfo2 = {
      _id: userInfo2Id,
      type: 1,
      external_ids: {
        zerozero: 222
      },
      skill_set: [
        {
          _id: chance.string({ length: 24, pool: "5" }),
          name: "Power",
          endorsements: []
        },
        {
          _id: chance.string({ length: 24, pool: "6" }),
          name: "Speed",
          endorsements: []
        }
      ]
    };
    const userInfo2Document = new UserInfo(userInfo2);
    await userInfo2Document.save();

    const userInfo3Id = chance.string({ length: 24, pool: "7" });
    const userInfo3 = {
      _id: userInfo3Id,
      type: 1,
      external_ids: {
        zerozero: 333
      },
      skill_set: [
        {
          _id: chance.string({ length: 24, pool: "8" }),
          name: "Power",
          endorsements: []
        },
        {
          _id: chance.string({ length: 24, pool: "9" }),
          name: "Speed",
          endorsements: []
        }
      ]
    };
    const userInfo3Document = new UserInfo(userInfo3);
    await userInfo3Document.save();

    const userInfo4Id = chance.string({ length: 24, pool: "0" });
    const userInfo4 = {
      _id: userInfo4Id,
      type: 1,
      external_ids: {
        zerozero: 444
      }
    };
    const userInfo4Document = new UserInfo(userInfo4);
    await userInfo4Document.save();

    const { body: actualResponse } = await api
      .get(`/api/players`)
      .set("Content-Type", "application/json")
      .expect(200);

    const expectedResponse = [
      {
        _id: userInfo1Id,
        achievements: [],
        created_at: actualResponse[0].created_at,
        followers: [],
        following: [],
        previous_seasons: [],
        recommendations: {
          list: [],
          top_5: []
        },
        skill_set: [
          {
            _id: chance.string({ length: 24, pool: "2" }),
            name: "Power",
            endorsements: []
          },
          {
            _id: chance.string({ length: 24, pool: "3" }),
            name: "Speed",
            endorsements: []
          }
        ],
        updated_at: actualResponse[0].updated_at,
        external_ids: {
          zerozero: 111
        }
      },
      {
        _id: userInfo2Id,
        achievements: [],
        created_at: actualResponse[1].created_at,
        followers: [],
        following: [],
        previous_seasons: [],
        recommendations: {
          list: [],
          top_5: []
        },
        skill_set: [
          {
            _id: chance.string({ length: 24, pool: "5" }),
            name: "Power",
            endorsements: []
          },
          {
            _id: chance.string({ length: 24, pool: "6" }),
            name: "Speed",
            endorsements: []
          }
        ],
        updated_at: actualResponse[1].updated_at,
        external_ids: {
          zerozero: 222
        }
      },
      {
        _id: userInfo3Id,
        achievements: [],
        created_at: actualResponse[2].created_at,
        followers: [],
        following: [],
        previous_seasons: [],
        recommendations: {
          list: [],
          top_5: []
        },
        skill_set: [
          {
            _id: chance.string({ length: 24, pool: "8" }),
            name: "Power",
            endorsements: []
          },
          {
            _id: chance.string({ length: 24, pool: "9" }),
            name: "Speed",
            endorsements: []
          }
        ],
        updated_at: actualResponse[2].updated_at,
        external_ids: {
          zerozero: 333
        }
      },
      {
        _id: userInfo4Id,
        achievements: [],
        created_at: actualResponse[3].created_at,
        followers: [],
        following: [],
        previous_seasons: [],
        recommendations: {
          list: [],
          top_5: []
        },
        skill_set: [],
        updated_at: actualResponse[3].updated_at,
        external_ids: {
          zerozero: 444
        }
      }
    ];

    assert.isArray(actualResponse);
    assert.lengthOf(actualResponse, 4);
    assert.sameDeepMembers(actualResponse, expectedResponse);
  });
});
