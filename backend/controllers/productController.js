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


const initGridFSForProducts = (conn) => {
  initGridFS(conn);
};

// Middleware to handle file upload (using multer middleware)
const uploadProductImage = async (req, res) => {
  try {
    const gfs = getGfsProductImages();
    if (!gfs) {
      console.error('GridFS for product images not initialized');
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'GridFS for product images not initialized' });
    }

    const file = req.file;
    if (!file) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'No file uploaded' });
    }

    // Create a readable stream from the uploaded file
    const readStream = fs.createReadStream(file.path);

    // Options for GridFS upload stream
    const options = {
      contentType: file.mimetype,
      filename: `${Date.now()}-${file.originalname}`,
      metadata: {
        productId: req.params.id, // Attach metadata if needed
      },
    };

    // Upload file to GridFS
    const uploadStream = gfs.openUploadStream(options);
    readStream.pipe(uploadStream);

    uploadStream.on('error', (err) => {
      console.error('Error uploading file to GridFS:', err.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    });

    uploadStream.on('finish', () => {
      console.log('File uploaded successfully to GridFS');
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error('Error deleting temporary file after upload:', err.message);
        }
      });
      res.status(StatusCodes.CREATED).json({ fileId: uploadStream.id });
    });
  } catch (error) {
    console.error('Error uploading file:', error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// Controller to get product image by ID
const getProductImageById = async (req, res) => {
  try {
    const gfs = getGfsProductImages();
    if (!gfs) {
      console.error('GridFS for product images not initialized');
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'GridFS for product images not initialized' });
    }

    const fileId = new ObjectId(req.params.id);
    const file = await gfs.find({ _id: fileId }).toArray();

    if (!file || file.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'File not found' });
    }

    const readstream = gfs.openDownloadStream(fileId);
    res.set('Content-Type', file[0].contentType);
    readstream.pipe(res);
  } catch (error) {
    console.error('Error retrieving file:', error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// Ensure GridFS is initialized for product images
initGridFSForProducts(mongoose.connection);

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  getProductImageById,

};
