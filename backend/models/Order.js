const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  status: { type: String, default: "processing" },
  currency: { type: String, default: "INR" },
  prices_include_tax: { type: Boolean, default: true },
  date_created: { type: Date, default: Date.now },
  date_modified: { type: Date, default: Date.now },
  discount_total: { type: Number, default: 0 },
  discount_tax: { type: Number, default: 0 },
  shipping_total: { type: Number, default: 0 },
  shipping_tax: { type: Number, default: 0 },
  cart_tax: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  total_tax: { type: Number, default: 0 },
  customer_id: { type: Number },
  billing: {
    first_name: { type: String },
    last_name: { type: String },
    company: { type: String },
    address_1: { type: String },
    address_2: { type: String },
    city: { type: String },
    state: { type: String },
    postcode: { type: String },
    country: { type: String },
    email: { type: String },
    phone: { type: String }
  },
  shipping: {
    first_name: { type: String },
    last_name: { type: String },
    company: { type: String },
    address_1: { type: String },
    address_2: { type: String },
    city: { type: String },
    state: { type: String },
    postcode: { type: String },
    country: { type: String },
    phone: { type: String }
  },
  order_notes: { type: String },
  customer_ip_address: { type: String },
  cart_ID: { type: String },
  order_product_details: [{
    id: { type: Number },
    name: { type: String },
    product_id: { type: Number },
    variation_id: { type: Number },
    quantity: { type: Number },
    tax_class: { type: String },
    subtotal: { type: Number, default: 0 },
    subtotal_tax: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    total_tax: { type: Number, default: 0 },
    taxes: [{
      id: { type: Number },
      total: { type: Number, default: 0 },
      subtotal: { type: Number, default: 0 }
    }],
    sku: { type: String },
    price: { type: Number, default: 0 },
    image: {
      id: { type: String },
      src: { type: String }
    },
    parent_name: { type: String }
  }],
  tax_lines: [{
    id: { type: Number },
    rate_code: { type: String },
    rate_id: { type: Number },
    label: { type: String },
    compound: { type: Boolean, default: false },
    tax_total: { type: Number, default: 0 },
    shipping_tax_total: { type: Number, default: 0 },
    rate_percent: { type: Number, default: 0 }
  }],
  payment_method: { type: String },
  payment_method_title: { type: String },
  transaction_id: { type: String },
  created_via: { type: String },
  customer_note: { type: String },
  date_completed: { type: Date },
  date_paid: { type: Date },
  shipping_lines: [{
    id: { type: Number },
    method_title: { type: String },
    method_id: { type: String },
    instance_id: { type: String },
    total: { type: Number, default: 0 },
    total_tax: { type: Number, default: 0 },
    taxes: { type: Array, default: [] },
    meta_data: [{
      id: { type: Number },
      key: { type: String },
      value: { type: String },
      display_key: { type: String },
      display_value: { type: String }
    }]
  }],
  fee_lines: { type: Array, default: [] },
  coupon_lines: { type: Array, default: [] },
  refunds: { type: Array, default: [] },
  payment_url: { type: String },
  is_editable: { type: Boolean, default: false },
  needs_payment: { type: Boolean, default: false },
  needs_processing: { type: Boolean, default: true },
  date_created_gmt: { type: Date },
  date_modified_gmt: { type: Date },
  date_completed_gmt: { type: Date },
  date_paid_gmt: { type: Date },
  currency_symbol: { type: String, default: "₹" }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
