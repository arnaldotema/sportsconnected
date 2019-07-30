"use strict";

const Chance = require("chance");
const { assert } = require("chai");
const { api } = require("../utils");
const { startServer, stopServer } = require("./../../lib/app");
const User = require("../../lib/models/football_user");

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
      .send({ email: "someNewemail@email.com" })
      .expect(200);

    const expectedResponse = { ...user, email: "someNewemail@email.com" };

    assert.deepEqual(actualResponse, expectedResponse);
  });

  it("Should get a user by id", async () => {
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
      .get(`/api/users/${id}`)
      .set("Content-Type", "application/json")
      .expect(200);

    const expectedResponse = user;

    assert.deepEqual(actualResponse, expectedResponse);
  });

  it("Should list users", async () => {
    const user1Id = chance.string({ length: 24, pool: "1" });
    const user1 = {
      _id: user1Id,
      profile_id: "",
      user_type: "football_user_info",
      email: "some@email.com",
      password: "somepasswordwithmorethan10chars"
    };
    const user1Document = new User(user1);
    await user1Document.save();

    const user2Id = chance.string({ length: 24, pool: "2" });
    const user2 = {
      _id: user2Id,
      profile_id: "",
      user_type: "football_user_info",
      email: "another@email.com",
      password: "anotherpasswordwithmorethan10chars"
    };
    const user2Document = new User(user2);
    await user2Document.save();

    const user3Id = chance.string({ length: 24, pool: "3" });
    const user3 = {
      _id: user3Id,
      profile_id: "",
      user_type: "football_user_info",
      email: "yetanother@email.com",
      password: "yetanotherpasswordwithmorethan10chars"
    };
    const user3Document = new User(user3);
    await user3Document.save();

    const user4Id = chance.string({ length: 24, pool: "4" });
    const user4 = {
      _id: user4Id,
      profile_id: "",
      user_type: "football_user_info",
      email: "yetagainanother@email.com",
      password: "yetagainanotherpasswordwithmorethan10chars"
    };
    const user4Document = new User(user4);
    await user4Document.save();

    const expectedResponse = [user1, user2, user3, user4];

    const { body: actualResponse } = await api
      .get(`/api/users`)
      .set("Content-Type", "application/json")
      .expect(200);

    assert.isArray(actualResponse);
    assert.lengthOf(actualResponse, 4);
    assert.sameDeepMembers(expectedResponse, actualResponse);
  });
});
