const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLocaleLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();

    cb(null, fileName + fileExt);
  },
});

const fileFilter = (req, file, cb) => {
  const fileExt = path.extname(file.originalname);

  const allowedExtensions = [".mp3", ".wav", ".flac", ".ogg"];

  if (allowedExtensions.includes(fileExt)) {
    // Accept the file
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only popular music with mp3 or wav or flac or ogg are allowed!!!"
      )
    );
  }
};

const upload = multer({
  storage: storage,
  limits: 10000000,
  fileFilter: fileFilter,
});

module.exports = upload;
