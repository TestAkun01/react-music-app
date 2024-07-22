const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
  },
  { versionKey: false }
);

export default mongoose.models.Type ||
  mongoose.model("Type", typeSchema, "types");
