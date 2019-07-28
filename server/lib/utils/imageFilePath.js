"use strict";

/**
 *
 * @returns String
 * @param id
 * */
module.exports.buildAvatarFilePath = id => {
  if (!id) throw new Error("Id cannot be null when creating avatar file path");
  return `api/storage/images/user_info_season/${id}/system/avatar`;
};
