const mongoose = require('mongoose');

const Customermodel = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  shippingAddresses: [
    {
      address: {
        type: String,
        required: true
      },
      type: {
        type: String,
        enum: ['home', 'office', 'work'],
        required: true
      }
    }
  ],
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  orderHistory: [
    {
      orderId: {
        type: String,
        ref: 'Order',
        required: true
      },
      orderDate: {
        type: Date,
        required: true
      },
      totalOrderValue: {
        type: Number,
        required: true
      }
    }
  ],
  totalOrderValue: {
    type: Number,
    default: 0
  },
  numberOfOrders: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    enum: ['admin', 'customer', 'shopmanager'],
    default: 'customer'
  },
  password: {
    type: String,
    required: true
  }
});

const Customer= mongoose.model('Customer', Customermodel);

module.exports = Customer; 
