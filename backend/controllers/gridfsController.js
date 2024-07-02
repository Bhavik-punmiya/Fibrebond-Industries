const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const { getGfsInvoices } = require('../utils/gridfsConfig');
const mongoose = require('mongoose');
require('dotenv').config();
const fs = require('fs');

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return {
      bucketName: 'invoices',
      filename: req.body.uniqueId, // Use the unique ID provided in the request body
    };
  }
});

const upload = multer({ storage }).single('pdf');

const uploadInvoiceFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Error uploading file to GridFS:', err);
      return res.status(500).send('Error uploading file to GridFS');
    }
    res.status(201).json({ file: req.file });
  });
};

const uploadInvoiceFromPath = (filePath, filename, res) => {
  const gfs = getGfsInvoices();
  if (!gfs) {
    return res.status(500).send('GridFS for invoices not initialized');
  }

  const uploadStream = gfs.openUploadStream(filename);
  fs.createReadStream(filePath)
    .pipe(uploadStream)
    .on('error', (err) => {
      console.error('Error uploading file to GridFS:', err);
      res.status(500).send('Error uploading file to GridFS');
    })
    .on('finish', () => {
      res.status(201).json({ message: 'Invoice generated and uploaded successfully' });
    });
};
const getInvoiceFile = async (req, res) => {
  console.log('getInvoiceFile called');
  const gfs = getGfsInvoices();
  if (!gfs) {
    console.error('GridFS for invoices not initialized');
    return res.status(500).send('GridFS for invoices not initialized');
  }

  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    console.log(`Searching for invoice file with ID: ${fileId}`);
    const file = await gfs.find({ _id: fileId }).toArray();

    if (!file || file.length === 0) {
      console.error('Invoice file not found');
      return res.status(404).json({ error: 'Invoice file not found' });
    }

    const readstream = gfs.openDownloadStream(fileId);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="' + file[0].filename + '"');
    readstream.pipe(res);
  } catch (err) {
    console.error(`Error retrieving invoice file: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  uploadInvoiceFile,
  uploadInvoiceFromPath,
  getInvoiceFile,
};
