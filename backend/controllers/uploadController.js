const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const { getGfsUploads, getGfsProductImages } = require('../utils/gridfsConfig');
const mongoose = require('mongoose');
require('dotenv').config();

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return {
      bucketName: 'uploads',
      filename: `${Date.now()}-${file.originalname}`
    };
  }
});

const storage1 = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return {
      bucketName: 'productImages',
      filename: `${Date.now()}-${file.originalname}`
    };
  }
});

const upload = multer({ storage });
const uploadprod = multer({ storage: storage1 });

const uploadFile = (req, res) => {
  res.status(201).json({ file: req.file });
};

const uploadProductImage = (req, res) => {
  res.status(201).json({ file: req.file });
};

const getFile = async (req, res) => {
  console.log('getFile called');
  const gfs = getGfsUploads();
  if (!gfs) {
    console.error('GridFS for uploads not initialized');
    return res.status(500).send('GridFS for uploads not initialized');
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

const getProductImage = async (req, res) => {
  console.log('getProductImage called');
  const gfs = getGfsProductImages();
  if (!gfs) {
    console.error('GridFS for product images not initialized');
    return res.status(500).send('GridFS for product images not initialized');
  }

  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    console.log(`Searching for product image with ID: ${fileId}`);
    const file = await gfs.find({ _id: fileId }).toArray();

    if (!file || file.length === 0) {
      console.error('File not found');
      return res.status(404).json({ error: 'File not found' });
    }

    const readstream = gfs.openDownloadStream(fileId);
    res.set('Content-Type', file[0].contentType);
    readstream.pipe(res);
  } catch (err) {
    console.error(`Error retrieving product image: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

const deleteImageById = async (imageId) => {
  const gfs = getGfsProductImages();
  if (!gfs) {
    throw new Error('GridFS for product images not initialized');
  }

  try {
    const fileId = new mongoose.Types.ObjectId(imageId);
    await gfs.delete(fileId);
  } catch (err) {
    throw new Error(`Error deleting image: ${err.message}`);
  }
};


module.exports = {
  upload: upload.single('file'),
  uploadFile,
  getFile,
  uploadprod: uploadprod.single('file'),
  uploadProductImage,
  getProductImage,
  deleteImageById
};
