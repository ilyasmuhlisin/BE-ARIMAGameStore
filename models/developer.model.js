const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
  developer_name: { type: String, required: true },
  description: String,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Developer', developerSchema);