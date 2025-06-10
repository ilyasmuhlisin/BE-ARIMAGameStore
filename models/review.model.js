const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  game_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  description: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);