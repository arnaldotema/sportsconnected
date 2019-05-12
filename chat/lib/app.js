"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { port } = require("./../config");
const http = require("http").Server(app);

const { connect: connectDb } = require("./../db");
const chat = require("./api/routes/chat");
const auth = require("./api/routes/auth");
const socket = require("./api/controllers/socket");

app.use(bodyParser.json());
app.use("/chat", chat);
app.use("/login", auth);
app.use(express.static(__dirname + "/public"));

socket(io);
connectDb();

http.listen(port, () => {
  console.log("Running on Port: " + port);
});
