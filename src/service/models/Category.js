const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: String,
});

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema, "categorys");
