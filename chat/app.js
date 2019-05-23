"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { port } = require("./config/index");
const http = require("http").Server(app);
const io = require("socket.io");
const db = require("./db");
const chat = require("./lib/api/routes/chat");
const auth = require("./lib/api/routes/auth");
const socket = require("./lib/api/controllers/socket");

app.use(cors());
app.use(bodyParser.json());
app.use("/api/chat", chat);
app.use(express.static(__dirname + "/public"));

socket(io);
db.connect();

http.listen(port, () => {
  console.log("Running on Port: " + port);
});
