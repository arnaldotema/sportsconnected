"use strict";

//Libs
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const { port } = require("../config");
const passport = require("passport");
const formidable = require("./api/middleware/formidable-express");
const db = require("./../db");
const authenticate = passport.authenticate("jwt", { session: false });

//Configs
require("./api/auth/index");

//Routes
const auth = require("./api/routes/auth");
const users = require("./api/routes/user");
const seasons = require("./api/routes/seasons");
const players = require("./api/routes/player");
const global = require("./api/routes/global");
const ping = require("./api/routes/ping");
const teams = require("./api/routes/team");
const competitions = require("./api/routes/competition");
const matches = require("./api/routes/match");
const storage = require("./api/routes/storage");

//Logging
const logger = require("../logging");

//Server
const app = express();

let server;

//Body parser
app.use(bodyParser.json());

//Request
app.use(cors());

//Uploads
//app.use(formidable());

//Statics
app.use(express.static(path.join(__dirname, "dist")));

//Controllers
app.use("/api/healthcheck", ping);
app.use("/api/global", authenticate, global);
app.use("/api/players", authenticate, players);
app.use("/api/teams", authenticate, teams);
app.use("/api/competitions", authenticate, competitions);
app.use("/api/matches", authenticate, matches);
app.use("/api/storage", storage);
app.use("/api/users", users);
app.use("/api/seasons", seasons);
app.use("/api/auth", auth);

async function startServer() {
  await db.connect();

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "dist/index.html"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "dist/index.html"));
  });

  server = app.listen(port, function() {
    console.log("Server started on port " + port);
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
