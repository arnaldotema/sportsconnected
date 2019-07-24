"use strict";

const Chance = require("chance");
const { assert } = require("chai");
const { api } = require("../utils");
const { startServer, stopServer } = require("./../../lib/app");
const User = require("../../lib/models/football_user");
const { ObjectID } = require("mongoose").mongo;

const chance = new Chance();

describe("Component test: /users", () => {
  before(async () => {
    await startServer();
  });

  after(async () => {
    await stopServer();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    console.log("Deleted User documents");
  });

  it("Should post a user and get it", async () => {
    const user = {
      profile_id: "",
      user_type: "football_user_info",
      email: "some@email.com",
      password: "somepasswordwithmorethan10chars"
    };

    const expectedResponse = { ...user };

    const { body: actualResponse } = await api
      .post("/api/users")
      .set("Content-Type", "application/json")
      .send(user)
      .expect(201);

    assert.deepEqual(actualResponse, {
      ...expectedResponse,
      _id: actualResponse._id,
      last_login: actualResponse.last_login,
      subscription_expiration: actualResponse.subscription_expiration
    });
  });

  it("Should update a user and get it", async () => {
    const id = chance.string({ length: 24, pool: "1" });

    const user = {
      _id: id,
      profile_id: "",
      user_type: "football_user_info",
      email: "some@email.com",
      password: "somepasswordwithmorethan10chars"
    };
    const userDocument = new User(user);

    await userDocument.save();

    const { body: actualResponse } = await api
      .put(`/api/users/${id}`)
      .set("Content-Type", "application/json")
      .send({ ...user, email: "someNewemail@email.com" })
      .expect(200);

    const expectedResponse = { ...user };

    assert.deepEqual(actualResponse, expectedResponse);
  });

  it("Should get a user by id", async () => {
    // todo
  });

  it("Should list users", async () => {
    // todo
  });
});
