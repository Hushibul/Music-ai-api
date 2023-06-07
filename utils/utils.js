const fs = require("fs");
const path = require("path");

function deleteMusicFile(url) {
  const filePath = path.join(__dirname, url);

  fs.unlinkSync(filePath);
}

module.exports = {
  deleteMusicFile,
};
