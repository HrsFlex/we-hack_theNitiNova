const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  uniqueId: { type: String, required: true },
  password: { type: String, required: true },
  pdfPath: { type: String, required: true },
});

module.exports = mongoose.model('Pdf', pdfSchema);
