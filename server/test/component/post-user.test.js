"use strict";

const { assert } = require("chai");
const { api } = require("../utils");
const { startServer, stopServer } = require("./../../lib/app");
const User = require("../../lib/models/football_user");

describe("Component test: POST /users", () => {
  before(async () => {
    await startServer();
  });

  after(async () => {
    await stopServer();
  });

  beforeEach(async () => {
    await User.remove({});
    console.log("Deleted User documents");
  });

  it("Should post a user and get it", async () => {
    const mockDate = new Date().toISOString();

    const user = {
      profile_id: "",
      user_type: "football_user_info",
      email: "some@email.com",
      password: "somepasswordwithmorethan10chars",
      last_login: mockDate,
      subscription_expiration: mockDate
    };

    const expectedResponse = { ...user };

    const { body: actualResponse } = await api
      .post("/api/users")
      .set("Content-Type", "application/json")
      .send(user)
      .expect(201);

    assert.deepEqual(actualResponse, {
      ...expectedResponse,
      __v: 0,
      _id: actualResponse._id
    });
  });
});
