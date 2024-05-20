const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  image: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
