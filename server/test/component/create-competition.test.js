"use strict";

const { assert } = require("chai");
const { api } = require("../utils");
const { startServer, stopServer } = require("./../../lib/app");
const Competition = require("../../lib/models/football_competition");
const CompetitionSeason = require("../../lib/models/football_competition_season");
const Season = require("../../lib/models/football_season");

describe("Component test: POST /players", () => {
  before(async () => {
    await startServer();
  });

  after(async () => {
    await stopServer();
  });

  beforeEach(async () => {
    await Competition.remove({});
    await CompetitionSeason.remove({});
    await Season.remove({});
    console.log("Deleted Competition documents");
  });

  it("Should post a competition and get it", async () => {
    const competition = {
      name: "Liga Portuguesa",
      avatar: "https://avatar.com",
      external_ids: {
        zerozero: 12345678910
      }
    };

    const { body: actualResponse } = await api
      .post("/api/competition")
      .set("Content-Type", "application/json")
      .send(competition)
      .expect(201);

    const expectedResponse = {
      _id: actualResponse._id,
      name: "Liga Portuguesa",
      avatar: "https://avatar.com",
      external_ids: {
        zerozero: 12345678910
      },
      updated_at: actualResponse.updated_at,
      created_at: actualResponse.created_at
    };

    assert.deepEqual(actualResponse, expectedResponse);
  });
});
