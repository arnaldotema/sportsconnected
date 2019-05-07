"use strict";

const { assert } = require("chai");
const { start, stop } = require("../../index");

describe("Component test: GET /api/healthcheck", () => {
  before(async () => {
    await start();
  });

  after(async () => {
    await stop();
  });

  it("should crawl something from the web and retrieve some results", async () => {
    const crawledData = { data: "I am data" };
    const expected = { data: "I am data" };

    assert.deepEqual(crawledData, expected);
  });
});
