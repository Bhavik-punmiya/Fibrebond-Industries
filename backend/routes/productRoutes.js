const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProducts,
  addProductsToPlans
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

router.post('/products/delete', deleteProducts);

router.post('/add-products-to-plans', addProductsToPlans);

module.exports = router;
