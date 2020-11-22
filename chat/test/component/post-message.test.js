"use strict";

const { assert } = require("chai");
const { api } = require("../utils");
const { startServer, stopServer } = require("../../app");

describe("Component test: /messages", () => {
  before(async () => {
    await startServer();
  });

  after(async () => {
    await stopServer();
  });

  it("Should post a chat message and get it", async () => {
    const conversation = {
      participants: [
        {
          _id: "5cec0a73e1e5390b6ca801d9",
          name: "Iker Casillas Fern&#xE1;ndez",
          avatar:
            "https://www.zerozero.pt/img/jogadores/03/1003_20181004125200_iker_casillas.png",
          user_type: "football_user_info"
        }
      ],
      lastMessage: [],
      removed: [],
      created_at: new Date().getTime(),
      updated_at: new Date().getTime()
    };

    const { body: newConversation } = await api
      .post("/api/chat/conversations")
      .set("Content-Type", "application/json")
      .send(conversation)
      .expect(201);

    const message = {
      sender: {
        _id: "5cec0a73e1e5390b6ca801d9",
        name: "Iker Casillas Fern&#xE1;ndez",
        avatar:
          "https://www.zerozero.pt/img/jogadores/03/1003_20181004125200_iker_casillas.png",
        user_type: "football_user_info"
      },
      text: "ipsum ullamco mollit",
      chat_conversation_id: newConversation._id,
      created_at: new Date().toISOString()
    };

    const expectedResponse = {
      ...message,
      __v: 0,
      created_at: new Date().toISOString(),
      read_at: null,
      deleted: [],
      archived: []
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

  it("Should get a messageby id", async () => {
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

  it("Should list messages", async () => {
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
