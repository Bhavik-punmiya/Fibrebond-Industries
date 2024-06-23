const express = require('express');
const { upload, uploadFile, getFile } = require('../controllers/uploadController');
const router = express.Router();

router.post('/upload', upload, uploadFile);
router.get('/:id', getFile);

module.exports = router;
