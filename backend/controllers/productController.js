const { StatusCodes } = require('http-status-codes');
const Product = require('../models/Product');
// const { gfs, upload } = require('../utils/gridfsProductConfig');
// const multer = require('multer');
// const { productImageUpload } = require('../middleware/fileUploadMiddleware');
// const { gfsProductImage } = require('../middleware/fileUploadMiddleware');

// controllers/productController.js
const ProductImage = require('../models/ProductImage');

// Controller to get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// Controller to get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Product not found' });
    }
    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// Controller to create a new product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json(product);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// Controller to update a product by ID
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Product not found' });
    }
    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// Controller to delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Product not found' });
    }
    res.status(StatusCodes.OK).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

/// Controller to upload product images




// Upload product image
const uploadProductImages  = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { filename, mimetype } = req.file;
    const imageData = req.file.buffer;

    const productImage = new ProductImage({
      filename,
      contentType: mimetype,
      imageData,
    });

    await productImage.save();

    res.status(201).json({ message: 'Image uploaded successfully', image: productImage });
  } catch (error) {
    console.error('Error uploading product image:', error);
    res.status(500).json({ message: 'Error uploading product image' });
  }
};

// Retrieve product image
const getProductImage = async (req, res) => {
  try {
    const { filename } = req.params;
    const productImage = await ProductImage.findOne({ filename });

    if (!productImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.set('Content-Type', productImage.contentType);
    res.send(productImage.imageData);
  } catch (error) {
    console.error('Error retrieving product image:', error);
    res.status(500).json({ message: 'Error retrieving product image' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  getProductImage
};
