const express = require('express');
const multer = require('multer');
const { uploadPdf, accessPdf } = require('../controllers/pdfController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('pdf'), uploadPdf);
router.post('/access', accessPdf);

module.exports = router;
