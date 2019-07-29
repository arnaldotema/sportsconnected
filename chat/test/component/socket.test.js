"use strict";

const { assert } = require("chai");
const io = require("socket.io-client");
const { startServer, stopServer, io: ioServer } = require("../../app");

describe("Component test: socket connections to chat messages", () => {
  let socket = {};

  before(async () => {
    await startServer();
  });

  after(async () => {
    await stopServer();
  });

  beforeEach(function(done) {
    socket = io.connect("http://localhost:5000", {
      reconnect: true,
      transports: ["websocket"]
    });

    socket.on("connect", () => {
      console.log("Connected!");
      done();
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected...");
    });
  });

  afterEach(done => {
    if (socket.connected) {
      socket.disconnect();
    }
    ioServer.close();
    done();
  });

  it("should establish a socket communication", done => {
    ioServer.emit("echo", "Hello World");

    socket.once("echo", message => {
      assert.deepEqual(message, "Hello World");
      done();
    });

    ioServer.on("connection", socket => {
      assert.isNotNull(socket);
    });
  });
});
