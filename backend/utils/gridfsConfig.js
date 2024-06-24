const { GridFSBucket } = require('mongodb');

let gfsUploads, gfsProductImages;

const initGridFS = (conn) => {
  gfsUploads = new GridFSBucket(conn.db, { bucketName: 'uploads' });
  gfsProductImages = new GridFSBucket(conn.db, { bucketName: 'productImages' });
};

const getGfsUploads = () => gfsUploads;
const getGfsProductImages = () => gfsProductImages;

module.exports = { initGridFS, getGfsUploads, getGfsProductImages };
