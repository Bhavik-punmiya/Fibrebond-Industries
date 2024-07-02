const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      hsn: {
        type: String,
      },
      qty: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
        default: 0.0,
      },
      cgst: {
        type: Number,
        required: true,
      },
      sgst: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
  totals: {
    qty: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    discount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    cgst: {
      type: Number,
      required: true,
      default: 0.0,
    },
    sgst: {
      type: Number,
      required: true,
      default: 0.0,
    },
    grandTotal: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalInWords: {
      type: String,
      default: 'Zero',
    },
  },
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

module.exports = Cart;
