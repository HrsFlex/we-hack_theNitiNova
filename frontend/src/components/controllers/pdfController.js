const Pdf = require("../models/Pdf");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const uploadPdf = async (req, res) => {
  try {
    const uniqueId = uuidv4();
    const password = uuidv4().slice(0, 8);
    const hashedPassword = await bcrypt.hash(password, 10);
    const pdfPath = path.join("uploads", req.file.filename);

    const pdf = new Pdf({ uniqueId, password: hashedPassword, pdfPath });
    await pdf.save();

    res.json({ uniqueId, password });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const accessPdf = async (req, res) => {
  try {
    const { uniqueId, password } = req.body;
    const pdf = await Pdf.findOne({ uniqueId });

    if (!pdf) return res.status(404).json({ message: "PDF not found" });

    const isMatch = await bcrypt.compare(password, pdf.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const absolutePath = path.resolve(__dirname, "..", pdf.pdfPath);
    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    res.sendFile(absolutePath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadPdf, accessPdf };