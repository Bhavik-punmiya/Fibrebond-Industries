const express = require('express');
const router = express.Router();
const upload = require('../utils/fileUpload');
const uploadController = require('../controller/uploadController');

// Avatar upload endpoint
router.post('/upload-avatar', upload.single('photo'), uploadController.uploadAvatar);

// Document upload endpoint
router.post('/upload-document', upload.single('document'), uploadController.uploadDocument);

module.exports = router;
