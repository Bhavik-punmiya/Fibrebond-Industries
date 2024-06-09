const multer = require('multer');
const { GridFsStorage } = require('mongoose-gridfs');
const mongoose = require('mongoose');

// Create storage engine
const storage = new GridFsStorage({
  url: YOUR_MONGODB_URI,
  file: (req, file) => {
    if (file.fieldname === 'photo') {
      // If uploading an avatar
      return {
        filename: 'avatar_' + Date.now(), // Customize filename as needed
        bucketName: 'avatars' // GridFS bucket name for avatars
      };
    } else if (file.fieldname === 'document') {
      // If uploading a document
      return {
        filename: 'document_' + Date.now(), // Customize filename as needed
        bucketName: 'documents' // GridFS bucket name for documents
      };
    }
  }
});

module.exports = multer({ storage });
