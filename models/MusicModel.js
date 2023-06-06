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
  music : {
    type: String,
  }
  
});

const Music = mongoose.model("Music", musicSchema);

module.exports = Music;
