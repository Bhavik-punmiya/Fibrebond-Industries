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
    type: Number,
  },
  dimensions: {
    length: {
      type: Number,
    },
    breadth: {
      type: Number,
    },
    height: {
      type: Number,
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
