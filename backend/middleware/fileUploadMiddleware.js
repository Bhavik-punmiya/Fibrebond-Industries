const multer = require('multer');

// Multer storage configuration
const storage = multer.memoryStorage();
const productImageUpload = multer({ storage }).single('image');

module.exports = {
  productImageUpload
};
