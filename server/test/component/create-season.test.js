"use strict";

const Chance = require("chance");
const { assert } = require("chai");
const { api } = require("../utils");
const { startServer, stopServer } = require("./../../lib/app");
const Season = require("../../lib/models/football_season");

const chance = new Chance();

describe("Component test: /seasons", () => {
  before(async () => {
    await startServer();
  });

  after(async () => {
    await stopServer();
  });

  beforeEach(async () => {
    await Season.deleteMany({});
    console.log("Deleted Season documents");
  });

  it("Should post a season and get it", async () => {
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
      _id: actualResponse._id
    });
  });

  it("Should update a season and get it", async () => {
    const id = chance.string({ length: 24, pool: "1" });
    const season = {
      _id: id,
      name: "A season name",
      external_ids: {
        zerozero: 12345678
      }
    };

    const seasonDocument = new Season(season);

    await seasonDocument.save();

    const { body: actualResponse } = await api
      .put(`/api/seasons/${id}`)
      .set("Content-Type", "application/json")
      .send({ name: "A new season name" })
      .expect(200);

    assert.deepEqual(actualResponse, {
      ...season,
      name: "A new season name",
      updated_at: actualResponse.updated_at
    });
  });

  it("Should get a season by id", async () => {
    const id = chance.string({ length: 24, pool: "1" });
    const season = {
      _id: id,
      name: "A season name",
      external_ids: {
        zerozero: 12345678
      }
    };
    const seasonDocument = new Season(season);

    await seasonDocument.save();

    const { body: actualResponse } = await api
      .get(`/api/seasons/${id}`)
      .set("Content-Type", "application/json")
      .expect(200);

    assert.deepEqual(actualResponse, season);
  });

  it("Should list seasons", async () => {
    const season1Id = chance.string({ length: 24, pool: "1" });
    const season1 = {
      _id: season1Id,
      name: "A season name 1",
      external_ids: {
        zerozero: 12345678
      }
    };
    const season1Document = new Season(season1);
    await season1Document.save();

    const season2Id = chance.string({ length: 24, pool: "2" });
    const season2 = {
      _id: season2Id,
      name: "A season name 2",
      external_ids: {
        zerozero: 12345678
      }
    };
    const season2Document = new Season(season2);
    await season2Document.save();

    const season3Id = chance.string({ length: 24, pool: "3" });
    const season3 = {
      _id: season3Id,
      name: "A season name 3",
      external_ids: {
        zerozero: 12345678
      }
    };
    const season3Document = new Season(season3);
    await season3Document.save();

    const season4Id = chance.string({ length: 24, pool: "4" });
    const season4 = {
      _id: season4Id,
      name: "A season name 4",
      external_ids: {
        zerozero: 12345678
      }
    };
    const season4Document = new Season(season4);
    await season4Document.save();

    const expectedResponse = [season1, season2, season3, season4];

    const { body: actualResponse } = await api
      .get(`/api/seasons`)
      .set("Content-Type", "application/json")
      .expect(200);

    assert.isArray(actualResponse);
    assert.lengthOf(actualResponse, 4);
    assert.sameDeepMembers(expectedResponse, actualResponse);
  });
});
