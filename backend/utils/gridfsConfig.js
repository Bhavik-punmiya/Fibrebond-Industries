const { GridFSBucket } = require('mongodb');
let gfs, gridfsBucket;

const initGridFS = (conn) => {
  gridfsBucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
  gfs = gridfsBucket;
};

const getGfs = () => gfs;

module.exports = { initGridFS, getGfs };
