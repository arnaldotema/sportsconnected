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

  it("Should post a recommendation and get it", async () => {
    const teamId = ObjectId("5c933f212df4c36362731110");
    const mockAuthorId = ObjectId("5c933f212df4c36362731114");
    const team = new Team({
      _id: teamId,
      external_ids: { zerozero: 12345678910 }
    });
    await team.save();

    const recommendation = {
      user_type: "football_team",
      user_id: teamId.toString(),
      author: {
        author_type: "football_team",
        name: "Team John Doe",
        relationship: "Same competition",
        id: mockAuthorId.toString(),
        avatar: "https://www.avatar.com",
        team: {
          id: mockAuthorId.toString(),
          acronym: "TJD",
          avatar: "https://www.avatar.com",
          name: "Team John Doe"
        }
      },
      text: "You suck ahah!"
    };

    const { body: actualResponse } = await api
      .post(`/api/teams/${teamId.toString()}/recommendations`)
      .set("Content-Type", "application/json")
      .send({ recommendation })
      .expect(201);

    const expectedResponse = {
      _id: actualResponse._id,
      user_id: teamId.toString(),
      user_type: "football_team",
      author: {
        author_type: "football_team",
        name: "Team John Doe",
        relationship: "Same competition",
        id: mockAuthorId.toString(),
        avatar: "https://www.avatar.com",
        team: {
          id: mockAuthorId.toString(),
          acronym: "TJD",
          avatar: "https://www.avatar.com",
          name: "Team John Doe"
        }
      },
      text: "You suck ahah!",
      updated_at: actualResponse.updated_at,
      created_at: actualResponse.created_at
    };

    assert.deepEqual(actualResponse, expectedResponse);
  });
});
