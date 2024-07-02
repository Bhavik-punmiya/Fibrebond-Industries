const { GridFSBucket } = require('mongodb');

let gfsUploads, gfsProductImages, gfsInvoices;

const initGridFS = (conn) => {
    gfsUploads = new GridFSBucket(conn.db, { bucketName: 'uploads' });
    gfsProductImages = new GridFSBucket(conn.db, { bucketName: 'productImages' });
    gfsInvoices = new GridFSBucket(conn.db, { bucketName: 'invoices' });
};

const getGfsUploads = () => gfsUploads;
const getGfsProductImages = () => gfsProductImages;
const getGfsInvoices = () => gfsInvoices;

module.exports = { initGridFS, getGfsUploads, getGfsProductImages, getGfsInvoices };
