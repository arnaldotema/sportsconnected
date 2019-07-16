"use strict";

const { assert } = require("chai");
const { api } = require("../utils");
const { startServer, stopServer } = require("./../../lib/app");
const Recommendation = require("../../lib/models/football_recommendation");
const UserInfo = require("../../lib/models/football_user_info");
const { ObjectId } = require("mongoose").mongo;

describe("Component test: POST /players/:id/media", () => {
  before(async () => {
    await startServer();
  });

  after(async () => {
    await stopServer();
  });

  beforeEach(async () => {
    await Recommendation.deleteMany({});
    await UserInfo.deleteMany({});
    console.log("Deleted Recommendations documents");
    console.log("Deleted UserInfo documents");
  });

  it("Should post a media and get it", async () => {
    const userInfoId = ObjectId("5c933f212df4c36362731110");
    const leagueId = ObjectId("5c933f212df4c36362731122");
    const teamId = ObjectId("5c933f212df4c36362730000");
    const mockUserId = ObjectId("5c933f212df4c36362737777");
    const mockAuthorId = ObjectId("5c933f212df4c36362731114");
    const mockTeamId = ObjectId("5c933f212df4c36362000000");

    const userInfo = new UserInfo({
      _id: userInfoId,
      external_ids: { zerozero: 12345678910 }
    });

    await userInfo.save();

    const media = {
      user_type: "football_user_info",
      user_id: userInfoId.toString(),
      author: {
        type: "football_user_info",
        name: "John Doe",
        id: mockAuthorId.toString(),
        avatar: "https://www.avatar.com",
        team: {
          id: mockTeamId.toString(),
          acronym: "SLB",
          avatar: "https://www.avatar.com",
          name: "Sport Lisboa e Benfica"
        }
      },
      text:
        "John Doe does an amazing trick and amazes everyone with this bike goal!!",
      season_id: "",
      title: "Whatch this John Doe's amazing goal!!!",
      date: Date.now(),
      image: "https://www.avatar.com",
      references: {
        leagues: [{ name: "Some cool league name", id: leagueId.toString() }],
        team: [{ name: "Team John Doe", id: teamId.toString() }],
        user: [{ name: "Johny Doey", id: mockUserId.toString() }]
      }
    };

    const { body: actualResponse } = await api
      .post(`/api/players/${userInfoId.toString()}/media`)
      .set("Content-Type", "application/json")
      .send({ media })
      .expect(201);

    const expectedResponse = {
      _id: actualResponse._id,
      user_type: "football_user_info",
      user_id: userInfoId.toString(),
      author: {
        type: "football_user_info",
        name: "John Doe",
        id: mockAuthorId.toString(),
        avatar: "https://www.avatar.com",
        team: {
          id: mockTeamId.toString(),
          acronym: "SLB",
          avatar: "https://www.avatar.com",
          name: "Sport Lisboa e Benfica"
        }
      },
      text:
        "John Doe does an amazing trick and amazes everyone with this bike goal!!",
      season_id: "",
      title: "Whatch this John Doe's amazing goal!!!",
      date: Date.now(),
      image: "https://www.avatar.com",
      references: {
        leagues: [{ name: "Some cool league name", id: leagueId.toString() }],
        team: [{ name: "Team John Doe", id: teamId.toString() }],
        user: [{ name: "Johny Doey", id: mockUserId.toString() }]
      },
      updated_at: actualResponse.updated_at,
      created_at: actualResponse.created_at
    };

    assert.deepEqual(actualResponse, expectedResponse);
  });
});
