const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { versionKey: false }
);

export default mongoose.models.Artist ||
  mongoose.model("Artist", artistSchema, "artists");
