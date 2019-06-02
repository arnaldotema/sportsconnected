"use strict";

const PROD_DB =
  "mongodb://admin:pywball12@199.247.15.139:27017/sports_connected?authSource=admin";
const DEV_DB = "mongodb://localhost:27017/sports_connected";

/**
 *
 * ATTENTION!!!
 * IF THIS IS SET TO PROD IN LOCAL DEV, IT MAY DELETE EVERY DOCUMENT IN THE DATABASE
 * BECAUSE TESTS WILL DELETE EVERYTHING
 *
 **/
module.exports = {
  database: DEV_DB,
  port: 3000
};
