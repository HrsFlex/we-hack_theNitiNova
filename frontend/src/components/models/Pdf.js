const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  uniqueId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  filePath: { type: String, required: true },
});

module.exports = mongoose.model("Document", documentSchema);
