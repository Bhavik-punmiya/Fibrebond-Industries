const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const Grid = require('gridfs-stream');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

// Create Mongo connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;

conn.once('open', async () => {
  // Initialize stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('productImages'); // collection name
});

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const fileInfo = {
        bucketName: 'productImages', // collection name
        filename: `${Date.now()}-${file.originalname}`,
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });

module.exports = { gfs, upload };
