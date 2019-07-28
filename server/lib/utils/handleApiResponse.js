"use strict";

const format = require("./formatModel");

/**
 *
 * @returns Object
 * @param err
 * @param result
 * @param successCode
 * @param res
 * */
module.exports = async (err, result, successCode, res) => {
  if (err) {
    console.log(`GOT HERE!`);
    console.log(err);
    return res.status(500).json({
      message: "Error from the API.",
      error: err
    });
  }
  if (!result || result === undefined) {
    console.log(`GOT HERE!`);
    return res.status(404).json({
      message: "No such object"
    });
  }
  const formattedDocument = await format(result);
  return res.status(successCode).json(formattedDocument);
};
