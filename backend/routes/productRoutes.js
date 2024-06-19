const express = require('express');
const multer = require('multer');
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


const storage = multer.memoryStorage();
const upload = multer({ storage })


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


router.post('/upload', upload.single('file'), uploadProductImages);

// Retrieve product image by ID
router.get('/image/:id', getProductImage);

module.exports = router;
