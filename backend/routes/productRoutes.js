const express = require('express');
const router = express.Router();
const upload = require('../utils/multerConfig'); // Adjust the path as necessary
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProducts,
} = require('../controllers/productController');

// GET all products
router.get('/', getProducts);

// GET single product by ID
router.get('/:id', getProductById);

// POST create a new product
router.post('/', createProduct);

// PATCH update a product by ID
router.patch('/:id', updateProduct);

// DELETE delete a product by ID
router.delete('/:id', deleteProduct);

// POST upload products from JSON file
router.post('/upload-products', upload.single('products'), uploadProducts);

module.exports = router;
