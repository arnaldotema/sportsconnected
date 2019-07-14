"use strict";

const { assert } = require("chai");
const { api } = require("../utils");
const { startServer, stopServer } = require("./../../lib/app");
const Recommendation = require("../../lib/models/football_recommendation");
const UserInfo = require("../../lib/models/football_user_info");
const User = require("../../lib/models/football_user");
const { ObjectId } = require("mongoose").mongo;

describe("Component test: POST /recommendations", () => {
  before(async () => {
    await startServer();
  });

  after(async () => {
    await stopServer();
  });

  beforeEach(async () => {
    await Recommendation.remove({});
    await User.remove({});
    await UserInfo.remove({});
    console.log("Deleted Recommendations documents");
    console.log("Deleted User documents");
    console.log("Deleted UserInfo documents");
  });

  it.only("Should post a recommendation and get it", async () => {
    // const user = new User({email: 'test@test.com', password: 'testestestestestest'});
    // const { _id: userId } = await user.save();

    const userInfo = new UserInfo({
      type: 123,
      external_ids: { zerozero: 12345678910 }
    });
    const { _id: userInfoId } = await userInfo.save();

    const recommendation = {
      user_type: "football_user_info",
      user_id: userInfoId,
      author: {
        author_type: "football_user_info",
        name: "John Doe",
        relationship: "Team player",
        id: ObjectId("5c933f212df4c36362731114"),
        avatar: "https://www.avatar.com",
        team: {
          id: ObjectId("5c933f212df4c36362000000"),
          acronym: "SLB",
          avatar: "https://www.avatar.com",
          name: "Sport Lisboa e Benfica"
        }
      },
      text:
        "Extremely focused individual and an amazing team player. Would love to play with him again!"
    };

    console.log(userInfoId);

    const { body: actualResponse } = await api
      .post(`/api/players/${userInfoId}/recommendations`)
      .set("Content-Type", "application/json")
      .send({ recommendation })
      .expect(201);

    const expectedResponse = {
      _id: actualResponse._id,
      user_id: userInfoId,
      user_type: "football_user_info",
      author: {
        author_type: "football_user_info",
        name: "John Doe",
        relationship: "Team player",
        id: ObjectId("5c933f212df4c36362731114"),
        avatar: "https://www.avatar.com",
        team: {
          id: newTeam._id,
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
