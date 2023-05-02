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

const router = express.Router();

//Create New Music
router.post("/music/upload", uploadMusic);

//Getting a Music
router.get("/music/:id", getSingleMusic);

//Get All Music
router.get("/music", getAllMusic);

//Update Music
router.put("/music/:id", verifyTokenAndAdmin, updateMusic);

//Delete Music
router.delete("/music/:id", verifyToken, deleteMusic);

module.exports = router;
