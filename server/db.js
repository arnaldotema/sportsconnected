'use strict';

const mongoose = require('mongoose');
const logger = require('./logging');
const { database } = require('./config');

mongoose.connection.on('connected', function() {
  console.log('Connected to ' + database);
});
mongoose.connection.on('error', function(err) {
  console.log('Database error: ' + err);
});

async function connect () {
  await mongoose.connect(database).catch(err => logger.error(err, 'There was a problem connecting to the database.'));;
}

async function disconnect () {
  await mongoose.disconnect().catch(err => logger.error(err, 'There was a problem connecting to the database.'));
}

module.exports = { connect, disconnect };