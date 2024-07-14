const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema(
  {
    album_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
    },
    cover: { type: String },
    artist: { type: String },
    title: { type: String },
    duration: { type: String },
    file_url: { type: String },
  },
  { versionKey: false }
);

export default mongoose.models.Track ||
  mongoose.model("Track", trackSchema, "tracks");
