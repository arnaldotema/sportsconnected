"use strict";

const Chance = require("chance");
const { assert } = require("chai");
const io = require("socket.io-client");
const { startServer, stopServer, io: ioServer } = require("../../app");

const User = require("../../lib/models/football_user");
const ChatMessage = require("../../lib/models/chat_message");
const ChatConversation = require("../../lib/models/chat_conversation");
const ChatAttachment = require("../../lib/models/chat_attachment");
const ChatUnread = require("../../lib/models/chat_unread");

const chance = new Chance();

// Mock user id
const userId = chance.string({ length: 24, pool: "1" });

// initSocket returns a promise
// success: resolve a new socket object
// fail: reject a error
const initSocket = async () => {
  const userDocument = new User({
    _id: userId,
    profile_id: "",
    user_type: "football_user_info",
    email: "some@email.com",
    password: "somepasswordwithmorethan10chars"
  });
  await userDocument.save();

  return new Promise((resolve, reject) => {
    const socket = io.connect("http://localhost:5000", {
      "reconnection delay": 0,
      "reopen delay": 0,
      "force new connection": true,
      query: "userId=" + userId
    });

    // define event handler for successful connection
    socket.on("connect", () => {
      console.log("Connected!");
      resolve(socket);
    });
  });
};

// destroySocket returns a promise
// success: resolve true
// fail: resolve false
const destroySocket = socket => {
  return new Promise((resolve, reject) => {
    // check if socket connected
    if (socket.connected) {
      // disconnect socket
      console.log("disconnecting...");
      socket.disconnect();
      resolve(true);
    } else {
      // not connected
      console.log("no connection to break...");
      resolve(false);
    }
  });
};

describe("Component test: socket connections to chat messages", () => {
  let socketClient = {};

  before(async () => {
    await startServer();
  });

  after(async () => {
    await stopServer();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await ChatMessage.deleteMany({});
    await ChatConversation.deleteMany({});
    await ChatAttachment.deleteMany({});
    await ChatUnread.deleteMany({});
    console.log("Deleted User documents");
    console.log("Deleted ChatConversation documents");
    console.log("Deleted ChatAttachment documents");
    console.log("Deleted ChatUnread documents");
    socketClient = await initSocket();
  });

  afterEach(async () => {
    await destroySocket(socketClient);
  });

  it("should establish a socket communication", () => {
    ioServer.emit("echo", "Hello World");

    socketClient.once("echo", message => {
      assert.deepEqual(message, "Hello World");
    });

    ioServer.on("connection", socket => {
      assert.isNotNull(socket);
    });
  });

  it("should emit a conversation:create event and receive it back", async () => {
    let mockConversationId = "";
    const serverResponse = new Promise((resolve, reject) => {
      // define a handler for the test event
      socketClient.on("conversation:created", conversationId => {
        // return data for testing
        mockConversationId = conversationId;
        resolve(conversationId);
      });
    });

    const participants = [
      {
        name: "Participant name",
        info_id: chance.string({ length: 24, pool: "1" }),
        avatar: "http://www.avatar.com"
      }
    ];

    socketClient.emit("conversation:create", { participants });

    const response = await serverResponse;
    assert.deepEqual(response, mockConversationId);
  });

  it("should emit a message event and receive it back", async () => {
    const conversationId = chance.string({ length: 24, pool: "3" });
    const conversationDocument = new ChatConversation({
      _id: conversationId,
      participants: [
        {
          _id: userId,
          name: "Some mock name",
          user_type: "football_user_info",
          avatar: "Some mock avatar"
        }
      ]
    });
    await conversationDocument.save();

    let mockServerResponseData = {};

    const msg = {
      sender: {
        _id: userId,
        name: "Some mock name",
        user_type: "football_user_info",
        avatar: "Some mock avatar"
      },
      text: "Some mock text",
      chat_conversation_id: conversationId
    };

    const serverResponse = new Promise((resolve, reject) => {
      socketClient.on("message", msg => {
        // return data for testing
        mockServerResponseData = msg;
        resolve(msg);
      });
    });

    socketClient.emit("message", { msg });

    const response = await serverResponse;
    assert.deepEqual(response, mockServerResponseData);
  });
});
