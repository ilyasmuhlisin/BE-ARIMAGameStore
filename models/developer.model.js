const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema(
  {
    developer_name: { type: String, required: true },
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Developer", developerSchema);
