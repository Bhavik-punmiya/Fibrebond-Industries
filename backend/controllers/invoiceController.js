const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');
const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');
const { uploadInvoiceFromPath } = require('./gridfsController'); // Importing the function

const app = express();
app.use(bodyParser.json());

const generateInvoice = async (req, res) => {
  const invoiceData = req.body;
  const filename = `${invoiceData.orderNumber}.pdf`;
  const filePath = `./public/${filename}`;

  // Generate QR code
  QRCode.toDataURL(invoiceData.qrData, async (err, url) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error generating QR code');
    }

    try {
      const htmlTemplate = await fs.readFileSync(path.resolve(__dirname, './template/template.html'), 'utf8');
      const document = {
        html: htmlTemplate,
        data: {
          ...invoiceData,
          qrCode: url
        },
        path: filePath
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
          height: '10mm',
          contents: ''
        },
      };

      // Generate PDF
      await pdf.create(document, options);

      // Upload the generated PDF to GridFS
      uploadInvoiceFromPath(filePath, filename, res);

    } catch (error) {
      console.error('Error generating invoice:', error);
      res.status(500).send('Error generating invoice');
    }
  });
};



module.exports = { 
  generateInvoice,


};
