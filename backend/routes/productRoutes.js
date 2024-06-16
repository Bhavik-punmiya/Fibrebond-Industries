const express = require('express');
const router = express.Router();
const { upload } = require('../utils/gridfsProductConfig'); // Ensure this is correctly imported
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  getProductImage
} = require('../controllers/productController');

// GET all products
router.get('/', getAllProducts);

// GET single product by ID
router.get('/:id', getProductById);

// POST create a new product
router.post('/', createProduct);

// PATCH update a product by ID
router.patch('/:id', updateProduct);

// DELETE delete a product by ID
router.delete('/:id', deleteProduct);

// POST upload product images (using multer for file upload)
// Uncommented and corrected the route for uploading images
router.post('/:productId/images/upload', upload.array('images', 5), uploadProductImages);

// GET route to retrieve product image by filename using GridFS
router.get('/images/:filename', getProductImage);

module.exports = router;
