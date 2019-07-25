"use strict";

/**
 *
 * Formats mongo document to remove unwanted fields.
 * @param mongoDocument - Raw mongo document
 * @returns Object
 * */

module.exports = async mongoDocument => {
  if (Array.isArray(mongoDocument)) {
    const formattedDocuments = [];
    const format = mongoDocument.map(doc => {
      return new Promise(resolve => {
        const { __v, type, ...formattedDocument } = doc._doc;
        formattedDocuments.push(formattedDocument);
        resolve();
      });
    });

    await Promise.all(format);
    return formattedDocuments;
  } else {
    const { __v, type, ...formattedDocument } = mongoDocument._doc;
    return formattedDocument;
  }
};
