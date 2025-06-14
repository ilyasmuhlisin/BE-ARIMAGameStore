const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    categories_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    developer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Developer", required: true },
    price: { type: Number, required: true },
    pictures: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
