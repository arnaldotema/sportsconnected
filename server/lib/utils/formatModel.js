"use strict";

/**
 *
 * Formats mongo document to remove unwanted fields.
 * @param mongoDocument - Raw mongo document
 * @returns Object
 * */
module.exports = mongoDocument => {
  const { __v, type, ...formattedDocument } = mongoDocument._doc;
  return formattedDocument;
};
