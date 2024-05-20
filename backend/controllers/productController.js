const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const fs = require('fs');
const path = require('path');

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({ products });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/v1/products/:id
// @access  Public
const getProductById = async (req, res) => {
  const { id: productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new CustomError.NotFoundError(`Product with ID ${productId} not found`);
    }
    res.status(StatusCodes.OK).json({ product });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
};

// @desc    Create a new product
// @route   POST /api/v1/products
// @access  Private (Admin)
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// @desc    Update a product by ID
// @route   PATCH /api/v1/products/:id
// @access  Private (Admin)
const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(productId, req.body, { new: true, runValidators: true });
    if (!product) {
      throw new CustomError.NotFoundError(`Product with ID ${productId} not found`);
    }
    res.status(StatusCodes.OK).json({ product });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// @desc    Delete a product by ID
// @route   DELETE /api/v1/products/:id
// @access  Private (Admin)
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      throw new CustomError.NotFoundError(`Product with ID ${productId} not found`);
    }
    res.status(StatusCodes.OK).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// @desc    Upload products from JSON file
// @route   POST /api/v1/products/upload-products
// @access  Private (Admin)
const uploadProducts = async (req, res) => {
  try {
    const filePath = path.join(req.file.destination, req.file.filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(fileContent);
    await Product.insertMany(products);
    res.status(StatusCodes.OK).send({ message: 'Products uploaded successfully' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to upload products' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProducts,
};
