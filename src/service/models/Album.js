const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    artist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
      },
    ],
    type: {
      type: String,
    },
    release_date: {
      type: String,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    cover: {
      type: String,
    },
    track: [
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
