const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');
const fs = require('fs');
const pdf = require('pdf-creator-node');
const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const path = require('path');
const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const { getGfsInvoices } = require('../utils/gridfsConfig');

const app = express();
app.use(bodyParser.json());

const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
      return {
        bucketName: 'invoices',
        filename:  `${req.body.filename}` 
      };
    }
  });
  
  const upload = multer({ storage });

  function attachFilename(req, res, next) {
    req.filename = req.body.filename; // Attach the filename from the request body
    next();
  }

const generateInvoice = async (req, res) => {
    const invoiceData = req.body;
    const timestamp = Date.now();
    const filename = `${timestamp}-invoice.pdf`;
    console.log('Generating invoice:', invoiceData);

    // Generate QR code
    QRCode.toDataURL(invoiceData.qrData, async (err, url) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error generating QR code');
        }

        try {
            const htmlTemplate = fs.readFileSync(path.resolve(__dirname, './template/template.html'), 'utf8');

            const document = {
                html: htmlTemplate,
                data: {
                    ...invoiceData,
                    qrCode: url
                },
                path: `./public/${filename}`
            };



            const options = {
                format: 'A4',
                orientation: 'portrait',
                border: '10mm',
                header: {
                    height: '10mm',
                    contents: ''
                },
                footer: {
                    height: '10',
                    contents: ''
                },

            };
            
            // Generate PDF
            const pdfBuffer = await pdf.create(document, options);

      // Create a temporary file to store the PDF buffer
      attachFilename(req, res, async () => {
        // Now, the filename is available in the request object
        // Directly upload the PDF buffer to GridFS
        upload.single('pdf')(req, res, async (err) => {
          if (err) {
            console.error('Error uploading file to GridFS:', err);
            return res.status(500).send('Error uploading file to GridFS');
          }

          res.status(201).json({ message: 'Invoice generated and uploaded successfully' });
        });
      });
        } catch (error) {
            console.error('Error generating invoice:', error);
            res.status(500).send('Error generating invoice');
        }
    });
};

const uploadInvoice = async (req, res) => {
    // Handle file upload to GridFS
    const gfs = getGfsInvoices();
    const upload = multer({ storage: multer.memoryStorage() }).single('file');

    upload(req, res, (err) => {
        if (err) {
            console.error('Error uploading invoice:', err);
            return res.status(500).send('Error uploading invoice');
        }

        // File is already uploaded to memory storage by multer
        const filename = `${Date.now()}-invoice.pdf`; // Use the same pattern as in generateInvoice
        const buffer = req.file.buffer;

        // Create write stream to GridFS
        const uploadStream = gfs.openUploadStream(filename);
        uploadStream.write(buffer);
        uploadStream.end();

        uploadStream.on('error', (err) => {
            console.error('Error uploading file to GridFS:', err);
            res.status(500).send('Error uploading file to GridFS');
        });

        uploadStream.on('finish', () => {
            res.status(201).json({ message: 'Invoice uploaded successfully' });
        });
    });
};

module.exports = { generateInvoice, uploadInvoice };
