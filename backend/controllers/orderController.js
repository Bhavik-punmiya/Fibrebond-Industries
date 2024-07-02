const Order = require('../models/Order');
const Customer = require('../models/Customer');
const axios = require('axios');

const validStatuses = [
  'Draft',
  'Failed',
  'Processing',
  'Completed',
  'Cancelled',
  'Pending Payment',
  'On Hold',
  'Refunded',
  'Payment Received'
];


const createOrder = async (req, res) => {
  try {
    if (!validStatuses.includes(req.body.status)) {
      return res.status(400).json({ error: 'Invalid order status' });
    }
    const newOrder = new Order(req.body);
    await newOrder.save();
    const orderId = newOrder._id;

    // Data for the invoice API
    const invoiceData = {
      qrData: "https://fibrebondindustries.com",
      companyName: "Fibre Bond Industries",
      companyAddress: "A-418, T.T.C. Industrial Area, Sector 2, Mahape, Navi Mumbai, Maharashtra 400710",
      companyPAN: "AEJPK4753R",
      companyGSTIN: "27AEJPK4753R1ZP",
      invoiceNumber: `#${orderId}`,
      invoiceDate: new Date().toLocaleDateString(),
      orderNumber: orderId,
      orderDate: new Date().toLocaleDateString(),
      billingName: `${req.body.billing.first_name} ${req.body.billing.last_name}`,
      billingAddress: `${req.body.billing.address_1}, ${req.body.billing.city}, ${req.body.billing.state} ${req.body.billing.postcode}`,
      billingEmail: req.body.billing.email,
      billingPhone: req.body.billing.phone,
      items: req.body.order_product_details.map(item => ({
        description: item.name,
        hsnSac: item.tax_class,
        qty: item.quantity,
        price: item.price,
        amount: item.subtotal,
        discount: item.subtotal - item.total, 
        cgst: item.taxes.reduce((acc, tax) => acc + (tax.total / 2), 0),
        sgst: item.taxes.reduce((acc, tax) => acc + (tax.total / 2), 0),
        total: item.total
      })),
      totals: {
        qty: req.body.order_product_details.reduce((acc, item) => acc + item.quantity, 0),
        price: req.body.order_product_details.reduce((acc, item) => acc + item.price, 0),
        discount: req.body.discount_total,
        cgst: req.body.cart_tax / 2, 
        sgst: req.body.cart_tax / 2, 
        grandTotal: req.body.total,
        totalInWords: "Twenty" 
      }
    };
 
    // Call the invoice API
    const response =  axios.post('http://localhost:5000/api/v1/invoices/generate', invoiceData);


    // Update customer with new order ID
    await Customer.updateOne(
      { _id: req.body.customer_id },
      { $push: { orders: orderId } }
    );
    console.log('Customer updated with new order ID');
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid order status' });
    }
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getOrderTableDetails = async (req, res) => {
  try {
    const orders = await Order.find({}, 'billing.first_name billing.last_name _id date_created status total shipping_lines payment_method');
    const orderDetails = orders.map(order => ({
      billingName: `${order.billing.first_name} ${order.billing.last_name}`,
      orderId: order._id,
      invoiceDate: order.date_created,
      status: order.status,
      purchaseType: order.payment_method,
      total: order.total,
      shippingStatus: order.shipping_lines.length ? order.shipping_lines[0].method_title : 'N/A',
      upiPayment: order.payment_method === 'UPI'
    }));
    res.status(200).json(orderDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Find the order to get the customer ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const customerId = order.customer_id;

    // Delete the order
    await Order.findByIdAndDelete(orderId);

    // Remove the order ID from the customer's orders array
    await Customer.updateOne(
      { _id: customerId },
      { $pull: { orders: orderId } }
    );

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
  getAllOrders,
  getOrderTableDetails,
};

