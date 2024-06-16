const { StatusCodes } = require('http-status-codes');
const Product = require('../models/Product');
// const upload = require('../utils/multerproductConfig');
const { gfs } = require('../utils/gridfsProductConfig');
const { GridFsStorage } = require('multer-gridfs-storage');
const { upload } = require('../utils/gridfsProductConfig');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

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

// Controller to upload product images
const uploadProductImages = async (req, res) => {
  try {
    upload.array('images', 5)(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'File upload error' });
      } else if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
      }

      // Files uploaded successfully
      const fileInfos = req.files.map(file => ({
        filename: file.filename,
        contentType: file.mimetype,
        size: file.size
      }));

      res.status(StatusCodes.CREATED).json({ fileInfos });
    });
  } catch (error) {
    console.error('Error uploading product images:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Server error' });
  }
};
// Retrieve product image by filename using GridFS
const getProductImage = async (req, res) => {
  try {
    const { filename } = req.params;

    // Check if gfs is initialized
    if (!gfs) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'GridFS not initialized' });
    }

    // Retrieve file from GridFS
    gfs.find({ filename }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'File not found' });
      }

      // Check if file is an image (optional)
      // Perform additional checks if necessary

      // Read output to browser
      const readstream = gfs.openDownloadStreamByName(filename);
      readstream.pipe(res);
    });
  } catch (error) {
    console.error('Error retrieving product image:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Server error' });
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
