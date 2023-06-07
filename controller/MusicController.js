const Music = require("../models/MusicModel");
const { deleteMusicFile } = require("../utils/utils");

//Upload Music
const uploadMusic = async (req, res, next) => {
  try {
    const url = req.protocol + "://" + req.get("host");

    const { name, genre } = req.body;
    const existingMusic = await Music.findOne({ name });

    const music = req.file.filename;
    const musicUrl = url + "/uploads/" + music;

    if (existingMusic) {
      const musicUrl = "./../uploads/" + music;
      deleteMusicFile(musicUrl);

      res.status(203).json({
        success: false,
        message: "Music with this name already exists!",
      });
    } else {
      const music = new Music({ name, genre, music: musicUrl });

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
    } else {
      res.status(200).json({ success: true, music });
    }
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
    const url = req.protocol + "://" + req.get("host");

    const { id } = req.params;
    const existingMusic = await Music.findById(id);

    if (!existingMusic) {
      res.status(404).join({ success: false, message: "Music not found" });
    } else {
      const { name, genre } = req.body;

      const newMusicFile = req?.file?.filename;

      const newMusicUrl = url + "/uploads/" + newMusicFile;

      if (newMusicFile) {
        const musicUrl = existingMusic.music;
        const musicPath = "./../uploads" + musicUrl.split("uploads")[1];

        deleteMusicFile(musicPath);

        const updatedMusic = await Music.findByIdAndUpdate(
          {
            _id: id,
          },
          {
            name,
            genre,
            music: newMusicUrl,
          },
          { new: true }
        );
        res.status(203).json({ success: true, updatedMusic });
      } else {
        const updatedMusic = await Music.findByIdAndUpdate(
          {
            _id: id,
          },
          {
            name,
            genre,
          },
          { new: true }
        );
        res.status(203).json({ success: true, updatedMusic });
      }
    }
  } catch (err) {
    // res.status(500).json(err);

    // const newMusicPath = "./../uploads/" + newMusicFile;

    // deleteMusicFile(newMusicPath);

    next(err);
  }
};

//Delete Music
const deleteMusic = async (req, res, next) => {
  try {
    const { id } = req.params;

    const musicUrl = await Music.findById({ _id: id });

    if (musicUrl !== null) {
      const musicPath = "./../uploads" + musicUrl.music.split("uploads")[1];
      deleteMusicFile(musicPath);
    }

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
