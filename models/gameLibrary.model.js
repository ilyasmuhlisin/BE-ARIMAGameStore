const mongoose = require("mongoose");

const gameLibrarySchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    game_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  },
  { timestamps: true }
);

gameLibrarySchema.index({ user_id: 1, game_id: 1 }, { unique: true });

module.exports = mongoose.model("GameLibrary", gameLibrarySchema);
