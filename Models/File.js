const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  type: String, // 'image' or 'video'
});

module.exports = mongoose.model('File', fileSchema);
