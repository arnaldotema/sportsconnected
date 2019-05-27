"use strict";

const { assert } = require("chai");
const { api } = require("../utils");
const { startServer, stopServer } = require("../../app");

describe("Component test: POST /messages", () => {
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
});
