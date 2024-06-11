const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const fs = require('fs');
const path = require('path');
const { StatusCodes } = require('http-status-codes');

// @desc    Upload a file to GridFS
// @route   POST /api/v1/uploads
// @access  Public
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'No file uploaded' });
    }

    const gridFsBucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'uploads'
    });

    const uploadStream = gridFsBucket.openUploadStream(req.file.filename);
    const filePath = path.join(__dirname, '../', req.file.path);
    fs.createReadStream(filePath).pipe(uploadStream);

    uploadStream.on('error', (error) => {
      console.error('Error uploading file to GridFS:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error uploading file' });
    });

    uploadStream.on('finish', () => {
      res.status(StatusCodes.CREATED).json({ fileId: uploadStream.id, filename: req.file.filename });
    });

  } catch (error) {
    console.error('Error uploading file:', error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

module.exports = {
  uploadFile,
};
