import mongoose from "mongoose";

const trackSchema = new mongoose.Schema(
  {
    album_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      default: null,
    },
    cover: { type: String },
    artist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
        default: null,
      },
    ],
    title: {
      type: String,
    },
    duration: {
      type: String,
    },
    file_url: {
      type: String,
    },
  },
  { versionKey: false }
);

export default mongoose.models.Track ||
  mongoose.model("Track", trackSchema, "tracks");
