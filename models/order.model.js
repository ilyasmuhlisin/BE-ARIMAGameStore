const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    game_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, required: true },
    payment_method: { type: String, enum: ["OVO", "BCA", "DANA", "ShopeePay", "QRIS"], required: true },
    proof: { type: String },
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
