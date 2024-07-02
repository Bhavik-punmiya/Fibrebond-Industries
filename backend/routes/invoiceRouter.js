const express = require('express');
const router = express.Router();
const { generateInvoice, uploadInvoice } = require('../controllers/invoiceController');

// Route to generate and download invoice PDF
router.post('/generate', generateInvoice);

// Route to upload generated invoice PDF to GridFS
router.post('/upload', uploadInvoice);

module.exports = router;
