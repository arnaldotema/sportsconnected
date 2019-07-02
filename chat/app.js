"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { port } = require("./config");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const cors = require("cors");
const db = require("./db");
const chat = require("./lib/api/routes/chat");
const socket = require("./lib/api/controllers/socket");

let server;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/chat", chat);
app.use(express.static(__dirname + "/public"));

async function startServer() {
  await db.connect();
  socket(io);
  server = app.listen(port, () => {
    console.log("Running on Port: " + port);
  });
}

async function stopServer() {
  await db.disconnect();
  server.close();
}

module.exports = { app, startServer, stopServer };

if (require.main === module) {
  startServer().catch(err =>
    logger.error(err, "There was a problem starting the server")
  );
}
