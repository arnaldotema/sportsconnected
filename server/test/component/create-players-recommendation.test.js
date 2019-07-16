"use strict";

const { assert } = require("chai");
const { api } = require("../utils");
const { startServer, stopServer } = require("./../../lib/app");
const Recommendation = require("../../lib/models/football_recommendation");
const UserInfo = require("../../lib/models/football_user_info");
const { ObjectId } = require("mongoose").mongo;

describe("Component test: POST /players/:id/recommendations", () => {
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

  it("Should post a recommendation and get it", async () => {
    const userInfoId = ObjectId("5c933f212df4c36362731110");
    const mockAuthorId = ObjectId("5c933f212df4c36362731114");
    const mockTeamId = ObjectId("5c933f212df4c36362000000");
    const userInfo = new UserInfo({
      _id: userInfoId,
      type: 123,
      external_ids: { zerozero: 12345678910 }
    });
    await userInfo.save();

    const recommendation = {
      user_type: "football_user_info",
      user_id: userInfoId.toString(),
      author: {
        author_type: "football_user_info",
        name: "John Doe",
        relationship: "Team player",
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
        "Extremely focused individual and an amazing team player. Would love to play with him again!"
    };

    const { body: actualResponse } = await api
      .post(`/api/players/${userInfoId.toString()}/recommendations`)
      .set("Content-Type", "application/json")
      .send({ recommendation })
      .expect(201);

    const expectedResponse = {
      _id: actualResponse._id,
      user_id: userInfoId.toString(),
      user_type: "football_user_info",
      author: {
        author_type: "football_user_info",
        name: "John Doe",
        relationship: "Team player",
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
        "Extremely focused individual and an amazing team player. Would love to play with him again!",
      updated_at: actualResponse.updated_at,
      created_at: actualResponse.created_at
    };

    assert.deepEqual(actualResponse, expectedResponse);
  });
});
