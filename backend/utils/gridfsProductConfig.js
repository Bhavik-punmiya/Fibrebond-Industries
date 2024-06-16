const express = require('express');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const url = process.env.MONGO_URI; // Replace with your MongoDB connection string

// Create a storage object with a given configuration
const storage = new GridFsStorage({
  url: url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: 'uploads' // Specify the bucket name where files will be stored
      };
      resolve(fileInfo);
    });
  }
});

// Set multer storage engine to the newly created object
const upload = multer({ storage });
