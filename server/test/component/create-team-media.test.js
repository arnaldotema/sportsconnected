"use strict";

const { assert } = require("chai");
const { api } = require("../utils");
const { startServer, stopServer } = require("./../../lib/app");
const Media = require("../../lib/models/football_media");
const Team = require("../../lib/models/football_team");
const TeamSeason = require("../../lib/models/football_team_season");
const { ObjectId } = require("mongoose").mongo;

describe("Component test: POST /teams/:id/media", () => {
  before(async () => {
    await startServer();
  });

  after(async () => {
    await stopServer();
  });

  beforeEach(async () => {
    await Media.deleteMany({});
    await Team.deleteMany({});
    await TeamSeason.deleteMany({});
    console.log("Deleted Media documents");
    console.log("Deleted Team documents");
    console.log("Deleted TeamSeason documents");
  });

  it("Should post a media and get it", async () => {
    const teamId = ObjectId("5c933f212df4c36362731110");
    const mockTeamSeasonId = ObjectId("5c933f212df4c3636273dddd");
    const mockSeasonId = ObjectId("5c933f212df4c3636273dddd");
    const mockAuthorId = ObjectId("5c933f212df4c36362731114");
    const mockTeamId = ObjectId("5c933f212df4c36362000000");

    const team = new Team({
      _id: teamId,
      external_ids: { zerozero: 12345678910 }
    });

    await team.save();

    const teamSeason = new TeamSeason({
      team_id: teamId,
      _id: mockTeamSeasonId,
      season_id: mockSeasonId,
      external_ids: { zerozero: 12345678911 }
    });

    await teamSeason.save();

    const media = {
      user_type: "football_team",
      user_info_id: teamId.toString(),
      season_id: mockTeamSeasonId.toString(),
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
      .post(`/api/teams/${teamId.toString()}/media`)
      .set("Content-Type", "application/json")
      .send({ media })
      .expect(201);

    const expectedResponse = {
      _id: actualResponse._id,
      user_type: "football_team",
      user_info_id: teamId.toString(),
      season_id: mockTeamSeasonId.toString(),
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
