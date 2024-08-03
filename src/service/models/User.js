import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    image: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { versionKey: false }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema, "users");
