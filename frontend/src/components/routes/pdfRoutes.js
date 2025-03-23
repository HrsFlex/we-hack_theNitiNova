const express = require("express");
const multer = require("multer");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const fileStorage = {}; // Store files in memory

// ✅ Upload Route
router.post("/upload", upload.single("pdf"), (req, res) => {
  console.log("🟢 Request received at /upload");

  if (!req.file) {
    console.error("❌ No file uploaded!");
    return res.status(400).json({ message: "No file uploaded!" });
  }

  console.log("✅ File received:", req.file.originalname);

  const uniqueId = Math.random().toString(36).substring(2, 10);
  const password = Math.random().toString(36).substring(2, 10);

  // Store file with ID & Password
  fileStorage[uniqueId] = { file: req.file.buffer, password };

  console.log("📌 Stored File - Unique ID:", uniqueId, "Password:", password);

  res.json({ message: "File uploaded successfully!", uniqueId, password });
});

// ✅ Access Route
router.post("/access", (req, res) => {
  console.log("🔹 Request received at /access");

  const { uniqueId, password } = req.body;

  console.log("🔍 Received Unique ID:", uniqueId, "Password:", password);

  if (!uniqueId || !password) {
    console.error("⚠️ Missing credentials!");
    return res.status(400).json({ message: "⚠️ Unique ID and Password required!" });
  }

  const fileData = fileStorage[uniqueId];

  if (!fileData) {
    console.error("❌ Document not found!");
    return res.status(404).json({ message: "❌ Document not found!" });
  }

  if (fileData.password !== password) {
    console.error("🔒 Incorrect password!");
    return res.status(401).json({ message: "🔒 Incorrect password!" });
  }

  console.log("✅ Document accessed successfully:", uniqueId);

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": 'inline; filename="document.pdf"',
  });

  res.send(fileData.file);
});

module.exports = router;
