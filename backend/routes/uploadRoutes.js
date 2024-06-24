const express = require('express');
const { upload, 
    uploadFile,
    getFile,
    uploadprod,
    uploadProductImage,
    getProductImage } = require('../controllers/uploadController');
const router = express.Router();

router.post('/file/upload', upload, uploadFile);
router.get('/file/:id', getFile);
router.post('/product/upload', uploadprod, uploadProductImage);
router.get('/product/:id', getProductImage);

module.exports = router;
