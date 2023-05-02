const Music = require("../models/MusicModel");

//Upload Music
const uploadMusic = async (req, res, next) => {
  try {
    const { name, genre } = req.body;

    const existingMusic = await Music.findOne({ name });

    if (existingMusic) {
      res.status(203).json({
        success: false,
        message: "Music with this name already exists!",
      });
    } else {
      const music = new Music({ name, genre });

      await music.save();
      res.status(201).json({ success: true, music });
    }
  } catch (err) {
    // res.status(500).json(error);

    next(err);
  }
};

//Getting Music by Id
const getSingleMusic = async (req, res, next) => {
  try {
    const { id } = req.params;

    const music = await Music.findById(id);

    if (!music) {
      res.status(404).json({ success: false, message: "Music not found!" });
    }
    res.status(200).json({ success: true, music });
  } catch (err) {
    // res.status(407).json(err);
    next(err);
  }
};

//Get All Musics
const getAllMusic = async (req, res, next) => {
  try {
    const music = await Music.find();

    if (!music) {
      res.status(404).json({ success: false, message: "No music found!" });
    } else {
      res.status(200).json({ success: true, music });
    }
  } catch (err) {
    next(err);
  }
};

//Update Music
const updateMusic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, genre } = req.body;

    const music = await Music.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        name,
        genre,
      },
      { new: true }
    );
    res.status(203).json({ success: true, music });
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

//Delete Music
const deleteMusic = async (req, res, next) => {
  try {
    const { id } = req.params;

    const music = await Music.findByIdAndDelete({ _id: id });

    if (!music) {
      res.status(404).json({ success: false, message: "Music not found!" });
    } else {
      res.status(200).json({ success: true, message: "Music Deleted" });
    }
  } catch (err) {
    // res.status(500).json({ error: err });
    next(err);
  }
};

module.exports = {
  uploadMusic,
  getSingleMusic,
  getAllMusic,
  updateMusic,
  deleteMusic,
};
