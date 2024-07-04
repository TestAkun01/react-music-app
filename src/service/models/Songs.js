const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    release_date: { type: String },
    category: [{ type: String }],
    cover: { type: String },
    list: [
      {
        id: { type: Number },
        title: { type: String },
        duration: { type: String },
        file_url: { type: String },
      },
    ],
  },
  { versionKey: false }
);

export default mongoose.models.Song ||
  mongoose.model("Song", songSchema, "songs");
