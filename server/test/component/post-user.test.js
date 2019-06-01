"use strict";

const { assert } = require("chai");
const { api } = require("../utils");
const { startServer, stopServer } = require("./../../lib/app");

describe("Component test: POST /messages", () => {
  before(async () => {
    await startServer();
  });

  after(async () => {
    await stopServer();
  });

  it("Should post a user and get it", async () => {
    const user = {
      profile_id: "", // This is not this schema's ID. It's a reference for either the player, team or other type document.
      user_type: "football_user_info",
      email: "some@email.com",
      password: "somepasswordwithmorethan10chars",
      last_login: new Date().getTime(),
      subscription_expiration: new Date().getTime()
    };

    const { body: newConversation } = await api
      .post("/api/user")
      .set("Content-Type", "application/json")
      .send(user)
      .expect(201);

    const expectedResponse = {
      ...user,
      __v: 0
    };

    const { body: actualResponse } = await api
      .post("/api/chat/messages")
      .set("Content-Type", "application/json")
      .send(message)
      .expect(201);

    assert.deepEqual(actualResponse, {
      ...expectedResponse,
      _id: actualResponse._id
    });
  });
});
