"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { port } = require("./config/index");
const http = require("http").Server(app);

const { connect: connectDb } = require("./db");
const chat = require("./lib/api/routes/chat");
const auth = require("./lib/api/routes/auth");
const socket = require("./lib/api/controllers/socket");

app.use(bodyParser.json());
app.use("/chat", chat);
app.use("/login", auth);
app.use(express.static(__dirname + "/public"));

socket(io);
connectDb();

http.listen(port, () => {
  console.log("Running on Port: " + port);
});
