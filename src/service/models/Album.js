const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    artist: {
      type: String,
    },
    release_date: {
      type: String,
    },
    category: {
      type: [String],
    },
    cover: {
      type: String,
    },
    list: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Track",
      },
    ],
  },
  { versionKey: false }
);

export default mongoose.models.Album ||
  mongoose.model("Album", albumSchema, "albums");
