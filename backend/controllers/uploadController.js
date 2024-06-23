const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const { getGfs } = require('../utils/gridfsConfig');
const mongoose = require('mongoose');
require('dotenv').config();

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return {
      bucketName: 'uploads', // Setting collection name
      filename: `${Date.now()}-${file.originalname}` // Setting the filename to upload in the database
    };
  }
});

const upload = multer({ storage });

const uploadFile = (req, res) => {
  res.status(201).json({ file: req.file });
};

const getFile = async (req, res) => {
  console.log('getFile called');
  const gfs = getGfs();
  if (!gfs) {
    console.error('GridFS not initialized');
    return res.status(500).send('GridFS not initialized');
  }
  
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    console.log(`Searching for file with ID: ${fileId}`);
    const file = await gfs.find({ _id: fileId }).toArray();

    if (!file || file.length === 0) {
      console.error('File not found');
      return res.status(404).json({ error: 'File not found' });
    }

    const readstream = gfs.openDownloadStream(fileId);
    res.set('Content-Type', file[0].contentType);
    readstream.pipe(res);
  } catch (err) {
    console.error(`Error retrieving file: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  upload: upload.single('file'),
  uploadFile,
  getFile
};
