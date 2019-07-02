"use strict";

/**
 *
 * ATTENTION!!!
 * IF THIS IS SET TO PROD IN LOCAL DEV, IT MAY DELETE EVERY DOCUMENT IN THE DATABASE
 * BECAUSE TESTS WILL DELETE EVERYTHING
 *
 **/
module.exports = {
  database:
    process.env.NODE_ENV === "production"
      ? "mongodb://admin:pywball12@199.247.15.139:27017/sports_connected?authSource=admin"
      : "mongo:27017/sports_connected",
  //: "mongodb://localhost:27017/sports_connected",
  port: 3000
};
