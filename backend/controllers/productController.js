const { StatusCodes } = require('http-status-codes');
const Product = require('../models/Product');

const { getGridFSBucket } = require('../utils/gridfs');

const gridFSBucket =  getGridFSBucket();


const ProductImage = require('../models/ProductImage');


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
const uploadProductImages =  async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }

  const filename = `${Date.now()}-${req.file.originalname}`;
  const writestream = gridFSBucket.openUploadStream(filename, {
    contentType: req.file.mimetype
  });

  writestream.on('error', (err) => {
    return res.status(500).send({ message: 'Error uploading file', error: err.message });
  });

  writestream.on('finish', () => {
    res.send({ fileId: writestream.id, filename: filename });
  });

  writestream.end(req.file.buffer);
};

// Retrieve file from GridFS
const getProductImage = async (req, res) => {
  try {
    // Correctly convert the fileId string to a MongoDB ObjectId
    const objectId = new ObjectId(req.params.id);
    console.log(objectId)
    const file = await gridFSBucket.find({ _id: objectId }).toArray();

    if (file.length === 0) {
      return res.status(404).send({ message: 'File not found' });
    }

    const fileObj = file[0];
    const readstream = gridFSBucket.openDownloadStream(objectId);

    // Set headers to allow viewing in the browser
    res.setHeader('Content-Type', fileObj.contentType);

    readstream.pipe(res);
  } catch (error) {
    console.error('Error retrieving file:', error);
    return res.status(500).send({ message: 'Error retrieving file', error: error.message });
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
