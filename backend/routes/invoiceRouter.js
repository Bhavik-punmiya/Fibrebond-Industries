// routes/fileRoutes.js

const express = require('express');
const { uploadInvoiceFile, getInvoiceFile } = require('../controllers/gridfsController');
const { generateInvoice } = require('../controllers/invoiceController');
const { createProformaInvoice, getProformaInvoice } = require('../controllers/proformInvoiceController');

const router = express.Router();

// Route for generating and uploading an invoice
router.post('/generate', generateInvoice);

// Route for uploading an invoice directly
router.post('/upload-invoice', uploadInvoiceFile);

// Route for retrieving an invoice by ID
router.get('/pdf/:id', getInvoiceFile);



router.post('/proforma-invoices', createProformaInvoice);

router.get('/proforma-invoices', getProformaInvoice);

module.exports = router;


