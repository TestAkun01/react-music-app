import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    trackId: { type: String, ref: "Track", required: true },
    likedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.models.Like ||
  mongoose.model("Like", LikeSchema, "likes");
