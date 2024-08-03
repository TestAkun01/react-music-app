const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    artist: {
      type: String,
    },
    image_url: {
      type: String,
    },
    biography: {
      type: String,
    },
  },

  { versionKey: false }
);

export default mongoose.models.Artist ||
  mongoose.model("Artist", artistSchema, "artists");
