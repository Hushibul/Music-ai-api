const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  genre: {
    type: Array,
    required: true,
  },
});

const Music = mongoose.model("Music", musicSchema);

module.exports = Music;