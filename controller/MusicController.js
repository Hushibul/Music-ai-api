const Music = require("../models/MusicModel");

//Upload Music
const uploadMusic = async (req, res) => {
  const { name, genre } = req.body;
  try {
    const existingMusic = await Music.findOne({ name });

    if (existingMusic) {
      res.status(203).json({ message: "Music with this name already exists!" });
    } else {
      const music = new Music({ name, genre });

      await music.save();
      res.status(201).json(music);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//Getting Music by Id
const getSingleMusic = async (req, res) => {
  const { id } = req.params;

  try {
    const music = await Music.findById(id);

    if (!music) {
      res.status(404).json("Music not found!");
    }
    res.status(200).json(music);
  } catch (err) {
    res.status(407).json(err);
  }
};

//Update Music
const updateMusic = async (req, res) => {
  const { id } = req.params;
  const { name, genre } = req.body;

  try {
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
    res.status(203).json(music);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Delete Music
const deleteMusic = async (req, res) => {
  const { id } = req.params;

  try {
    const music = await Music.findByIdAndDelete({ _id: id });

    if (!music) {
      res.status(200).json({ message: "Music already deleted!" });
    } else {
      res.status(200).json({ message: "Music Deleted", music });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = { uploadMusic, getSingleMusic, updateMusic, deleteMusic };
