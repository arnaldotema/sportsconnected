"use strict";

const { assert } = require("chai");
const { api } = require("../utils");
const { startServer, stopServer } = require("../../app");

describe("Component test: GET /api/healthcheck", () => {
  before(async () => {
    await startServer();
  });

  after(async () => {
    await stopServer();
  });

  it('should send 200 status and "pong" message for the health check GET request', async () => {
    const { body } = await api
      .get("/api/chat/healthcheck")
      .set("Content-Type", "application/json")
      .expect(200);

    assert.deepEqual(body, { message: "pong" });
  });
});
