"use strict";

const { assert } = require("chai");
const { api } = require("../utils");
const { startServer, stopServer } = require("./../../lib/app");
const Season = require("../../lib/models/football_season");

describe("Component test: POST /seasons", () => {
  before(async () => {
    await startServer();
  });

  after(async () => {
    await stopServer();
  });

  beforeEach(async () => {
    await Season.remove({});
    console.log("Deleted Season documents");
  });

  it("Should post a user and get it", async () => {
    const mockDate = new Date().toISOString();

    const season = {
      name: "Mock Season",
      updated_at: mockDate,
      external_ids: {
        zerozero: 12345678910
      }
    };

    const expectedResponse = { ...season };

    const { body: actualResponse } = await api
      .post("/api/seasons")
      .set("Content-Type", "application/json")
      .send(season)
      .expect(201);

    assert.deepEqual(actualResponse, {
      ...expectedResponse,
      __v: 0,
      _id: actualResponse._id
    });
  });
});
