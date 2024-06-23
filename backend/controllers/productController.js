const { StatusCodes } = require('http-status-codes');
const { initGridFS, getGfsProductImages } = require('../utils/gridfsConfig');
const upload = require('../middleware/fileUploadMiddleware');
const Product = require('../models/Product');
const { ObjectId } = require('mongodb');
const fs = require('fs');


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

const createProduct = async (req, res) => {
  try {
    const {
      name,
      regularPrice,
      price,
      description,
      shortDescription,
      salesPrice,
      taxStatus,
      purchasable,
      stockQuantity,
      weight,
      dimensions,
      inStock,
      shippingRequired,
      categories,
      plans
    } = req.body;

    const product = new Product({
      name,
      regularPrice,
      price,
      description,
      shortDescription,
      salesPrice,
      taxStatus,
      purchasable,
      stockQuantity,
      weight,
      dimensions: {
        length: dimensions?.length,
        breadth: dimensions?.breadth,
        height: dimensions?.height,
      },
      inStock,
      shippingRequired,
      categories,
      plans
    });

    await product.save();
    res.status(StatusCodes.CREATED).json(product);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,

};
