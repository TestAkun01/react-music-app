import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Album",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.models.Comment ||
  mongoose.model("Comment", commentSchema, "comments");
