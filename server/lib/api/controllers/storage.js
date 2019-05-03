'use strict';

const path = require('path');

// User DB Interactions

exports.retrieve_image = function(req, res) {
  const file_path = path.join(__dirname, '../storage' + req.url.split('?')[0]);

  res.sendFile(file_path);
};
