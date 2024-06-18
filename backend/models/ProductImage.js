// models/ProductImage.js
const mongoose = require('mongoose');

const productImageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  imageData: { type: Buffer, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ProductImage = mongoose.model('ProductImage', productImageSchema);

module.exports = ProductImage;