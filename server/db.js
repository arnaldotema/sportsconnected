"use strict";

const mongoose = require("mongoose");
const logger = require("./logging");
const { database } = require("./config");

mongoose.connection.on("connected", function() {
  logger.info("Connected to " + database);
});
mongoose.connection.on("error", function(err) {
  logger.info("Database error: " + err);
});

async function connect() {
  logger.info("Connecting to the database");
  await mongoose
    .connect(database)
    .catch(err =>
      logger.error(err, "There was a problem connecting to the database.")
    );
}

async function disconnect() {
  logger.info("Disconnecting from the database");
  await mongoose
    .disconnect()
    .catch(err =>
      logger.error(err, "There was a problem connecting to the database.")
    );
}

module.exports = { connect, disconnect };
