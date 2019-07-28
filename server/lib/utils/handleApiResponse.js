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
module.exports.handleResponse = async (err, result, successCode, res) => {
  if (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error from the API.",
      error: err
    });
  }
  if (!result || result === undefined) {
    return res.status(404).json({
      message: "No such object"
    });
  }
  const formattedDocument = await format(result);
  return res.status(successCode).json(formattedDocument);
};

/**
 *
 * @returns Object
 * @param err
 * @param errorCode
 * @param res
 * @param actionDescription: What triggered the error
 * */
module.exports.handleError = (
  err,
  res,
  errorCode = 500,
  actionDescription = ""
) => {
  if (err) {
    return res.status(errorCode).json({
      message: `Error occurred while ${actionDescription}`,
      error: err
    });
  }
};
