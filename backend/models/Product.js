const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  regularPrice: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  plans: [{
    type: String,
  }],
  description: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  salesPrice: {
    type: Number,
  },
  taxStatus: {
    type: Boolean,
    default: true,
  },
  purchasable: {
    type: Boolean,
    default: true,
  },
  stockQuantity: {
    type: Number,
    default: 0,
  },
  weight: {
    type: String,
  },
  dimensions: {
    length: {
      type: String,
    },
    breadth: {
      type: String,
    },
    height: {
      type: String,
    },
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  shippingRequired: {
    type: Boolean,
    default: true,
  },
  images: [{
    type: String,
  }],
  categories: [{
    type: String,
  }],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
