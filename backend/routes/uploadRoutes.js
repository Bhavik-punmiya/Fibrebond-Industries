const express = require('express');
const router = express.Router();
const upload = require('../utils/multerConfig');
const { uploadFile } = require('../controllers/uploadController');

// POST upload a file
router.post('/', upload.single('file'), uploadFile);

module.exports = router;
