const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const connectDB = require("./src/components/config/db");
const pdfRoutes = require("./src/components/routes/pdfRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin:"http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("/api/pdf",pdfRoutes);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));