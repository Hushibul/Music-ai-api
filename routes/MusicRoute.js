const express = require("express");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middleware/authorization");

const {
  uploadMusic,
  getSingleMusic,
  updateMusic,
  deleteMusic,
  getAllMusic,
} = require("../controller/MusicController");
const upload = require("../middleware/multer");

const router = express.Router();

//Create New Music
router.post("/music/upload",upload.single("music"), uploadMusic);

//Getting a Music
router.get("/music/:id", getSingleMusic);

//Get All Music
router.get("/music", getAllMusic);

//Update Music
router.put("/music/:id", verifyTokenAndAdmin, updateMusic);

//Delete Music
router.delete("/music/:id",  deleteMusic);

module.exports = router;
