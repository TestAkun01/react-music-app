import mongoose from "mongoose";

const WatchHistorySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    trackId: { type: String, required: true },
    watchedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.models.WatchHistory ||
  mongoose.model("WatchHistory", WatchHistorySchema, "watch_historys");
