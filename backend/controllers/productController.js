const { StatusCodes } = require('http-status-codes');
const { initGridFS, getGfsProductImages } = require('../utils/gridfsConfig');
const upload = require('../middleware/fileUploadMiddleware');
const Product = require('../models/Product');
const { ObjectId } = require('mongodb');
const Plan = require('../models/Plans');
const fs = require('fs');
const { deleteImageById } = require('./uploadController');

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

const deleteProducts = async (req, res) => {
  const { productIds } = req.body;
  const deletionResults = [];

  try {
    for (const productId of productIds) {
      const product = await Product.findById(productId);

      if (product) {
        // Delete associated images
        const imageDeletionPromises = product.images.map(imageId => deleteImageById(imageId));
        await Promise.all(imageDeletionPromises);

        // Delete the product
        await Product.findByIdAndDelete(productId);
        deletionResults.push({ status: 'success', productId });
      } else {
        deletionResults.push({ status: 'error', productId, error: 'Product not found' });
      }
    }

    const allSuccessful = deletionResults.every(result => result.status === 'success');
    if (allSuccessful) {
      res.status(StatusCodes.OK).json({ message: 'Products and associated images deleted successfully' });
    } else {
      const errors = deletionResults.filter(result => result.status !== 'success');
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors });
    }
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
      plans,
      images
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
      plans,
      images
    });

    const savedProduct = await product.save();

    if (plans && plans.length > 0) {
      await Plan.updateMany(
        { planName: { $in: plans } },
        { $push: { products: savedProduct._id } }
      );
    }

    res.status(StatusCodes.CREATED).json(savedProduct);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
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
      plans,
      images
    } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
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
        plans,
        images
      },
      { new: true }
    );

    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Product not found' });
    }

    if (plans && plans.length > 0) {
      // Remove product ID from old plans
      await Plan.updateMany(
        { products: product._id },
        { $pull: { products: product._id } }
      );

      // Add product ID to new plans
      await Plan.updateMany(
        { planName: { $in: plans } },
        { $push: { products: product._id } }
      );
    }

    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};


const addProductsToPlans = async (req, res) => {
  const { productIds, selectedPlans } = req.body;

  try {
    // Add products to plans
    for (const planName of selectedPlans) {
      const plan = await Plan.findOne({ planName });
      if (plan) {
        const newProductIds = productIds.filter(id => !plan.products.includes(id));
        plan.products.push(...newProductIds);
        await plan.save();
      }
    }

    // Add plans to products
    for (const productId of productIds) {
      const product = await Product.findById(productId);
      if (product) {
        const newPlans = selectedPlans.filter(planName => !product.plans.includes(planName));
        product.plans.push(...newPlans);
        await product.save();
      }
    }

    res.status(StatusCodes.OK).json({ message: 'Products and plans updated successfully' });
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
  deleteProducts,
  addProductsToPlans
};
