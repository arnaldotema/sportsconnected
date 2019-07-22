"use strict";

/**
 *
 * ATTENTION!!!
 * IF THIS IS SET TO PROD IN LOCAL DEV, IT MAY DELETE EVERY DOCUMENT IN THE DATABASE
 * BECAUSE TESTS WILL DELETE EVERYTHING
 *
 **/
module.exports = {
  database: process.env.MONGO_URL,
  port: 3000
};
