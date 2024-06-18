const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  getProductImage
} = require('../controllers/productController');
const { productImageUpload } = require('../middleware/fileUploadMiddleware');


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



router.post('/upload', productImageUpload.single('image'), uploadProductImages);
router.get('/image/:filename', getProductImage);

module.exports = router;
