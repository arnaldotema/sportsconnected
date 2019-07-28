const mkdirp = require("mkdirp");
const fs = require("fs");
const request = require("request");
const imagePath = "./storage/images";

exports.saveFromUri = async function(uri, infoType, infoId, imageName, cb) {
  request.head((err, res, body) => {
    console.log("content-type:", res.headers["content-type"]);
    console.log("content-length:", res.headers["content-length"]);

    const path = createStoragePath(infoType, infoId, imageName);

    request(uri)
      .pipe(fs.createWriteStream(path))
      .on("close", cb);
  }, uri);
};

exports.saveFromFile = async function(file, infoType, infoId, imageName) {
  const path = createStoragePath(infoType, infoId, imageName);

  const dir = mkdirp.sync(path + "/system");

  if (!dir)
    throw Error(
      `Not able to create a directory for file ${file}, infoType ${infoType}, infoId ${infoId}, imageName ${imageName}`
    );

  const rStream = fs
    .createReadStream(file.path)
    .pipe(fs.createWriteStream(path + "/" + imageName));

  rStream.on("error", err => {
    throw err;
  });

  rStream.on("close", () => {
    return null;
  });
};

createStoragePath = function(info_type, info_id) {
  let path;

  switch (info_type) {
    case "team":
      path = imagePath + "/team_info_season/" + info_id;
      break;
    default:
      path = imagePath + "/user_info_season/" + info_id;
  }

  return path;
};
