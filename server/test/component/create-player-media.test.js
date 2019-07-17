"use strict";

const { assert } = require("chai");
const { api } = require("../utils");
const { startServer, stopServer } = require("./../../lib/app");
const Media = require("../../lib/models/football_media");
const UserInfo = require("../../lib/models/football_user_info");
const UserInfoSeason = require("../../lib/models/football_user_info_season");
const { ObjectId } = require("mongoose").mongo;

describe("Component test: POST /players/:id/media", () => {
  before(async () => {
    await startServer();
  });

  after(async () => {
    await stopServer();
  });

  beforeEach(async () => {
    await Media.deleteMany({});
    await UserInfo.deleteMany({});
    await UserInfoSeason.deleteMany({});
    console.log("Deleted Media documents");
    console.log("Deleted UserInfo documents");
    console.log("Deleted UserInfoSeason documents");
  });

  it("Should post a media and get it", async () => {
    const userInfoId = ObjectId("5c933f212df4c36362731110");
    const mockUserSeasonId = ObjectId("5c933f212df4c3636273dddd");
    const mockSeasonId = ObjectId("5c933f212df4c3636273dddd");
    const mockAuthorId = ObjectId("5c933f212df4c36362731114");
    const mockTeamId = ObjectId("5c933f212df4c36362000000");

    const userInfo = new UserInfo({
      _id: userInfoId,
      external_ids: { zerozero: 12345678910 },
      type: 1
    });

    await userInfo.save();

    const userInfoSeason = new UserInfoSeason({
      user_info_id: userInfoId,
      _id: mockUserSeasonId,
      season_id: mockSeasonId
    });

    await userInfoSeason.save();

    const media = {
      user_type: "football_user_info",
      user_info_id: userInfoId.toString(),
      season_id: mockUserSeasonId.toString(),
      author: {
        user_type: "football_user_info",
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
      title: "Whatch this John Doe's amazing goal!!!",
      date: Date.now(),
      image: "https://www.avatar.com",
      tags: ["Cool", "goal", "SLB", "JohnDoe"]
    };

    const { body: actualResponse } = await api
      .post(`/api/players/${userInfoId.toString()}/media`)
      .set("Content-Type", "application/json")
      .send({ media })
      .expect(201);

    const expectedResponse = {
      _id: actualResponse._id,
      user_type: "football_user_info",
      user_info_id: userInfoId.toString(),
      season_id: mockUserSeasonId.toString(),
      author: {
        user_type: "football_user_info",
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
      title: "Whatch this John Doe's amazing goal!!!",
      date: actualResponse.date,
      image: "https://www.avatar.com",
      tags: ["Cool", "goal", "SLB", "JohnDoe"],
      updated_at: actualResponse.updated_at,
      created_at: actualResponse.created_at
    };

    assert.deepEqual(actualResponse, expectedResponse);
  });
});
