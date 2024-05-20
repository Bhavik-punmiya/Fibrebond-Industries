const fs = require('fs'); // Asynchronous file system operations
const path = require('path'); 
// Models
const Order = require('../models/Order');
const Product = require('../models/Product');

// HTTP Status Codes
const { StatusCodes } = require('http-status-codes');

// Custom Error Handling
const CustomError = require('../errors');

// Simulating Stripe API Call
const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = 'someRandomValue';
  return { client_secret, amount };
};

// Create Order Function
const createOrder = async (req, res) => {
  const { cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError('No cart items provided');
  }
  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError('Please provide tax and shipping fee');
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new CustomError.NotFoundError(`No product with id: ${item.product}`);
    }
    const { name, price, image, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };
    orderItems.push(singleOrderItem);
    subtotal += item.amount * price;
  }

  const total = tax + shippingFee + subtotal;
  const paymentIntent = await fakeStripeAPI({ amount: total, currency: 'usd' });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json({ order, clientSecret: order.clientSecret });
};

// Get All Orders Function
const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

// Get Single Order Function
const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  res.status(StatusCodes.OK).json({ order });
};

// Get Current User Orders Function
const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

// Update Order Function
const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;

  // Extract fields from the request body
  const {
    orderItems,
    subtotal,
    tax,
    shippingFee,
    total,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = req.body;

  // Find the order by ID
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id: ${orderId}`);
  }

  // Validate fields if necessary
  if (orderItems) {
    // Assuming you have a validation function for order items
    validateOrderItems(orderItems);
  }
  if (subtotal && subtotal < 0) {
    throw new CustomError.BadRequestError('Subtotal cannot be negative');
  }
  if (tax && tax < 0) {
    throw new CustomError.BadRequestError('Tax cannot be negative');
  }
  if (shippingFee && shippingFee < 0) {
    throw new CustomError.BadRequestError('Shipping fee cannot be negative');
  }
  if (total && total < 0) {
    throw new CustomError.BadRequestError('Total cannot be negative');
  }

  // Update fields
  if (orderItems) order.orderItems = orderItems;
  if (subtotal) order.subtotal = subtotal;
  if (tax) order.tax = tax;
  if (shippingFee) order.shippingFee = shippingFee;
  if (total) order.total = total;
  if (isPaid !== undefined) order.isPaid = isPaid;
  if (paidAt) order.paidAt = paidAt;
  if (isDelivered !== undefined) order.isDelivered = isDelivered;
  if (deliveredAt) order.deliveredAt = deliveredAt;

  // Save the updated order
  await order.save();

  res.status(StatusCodes.OK).json({ order });
};

// Example validation function (you should implement your own validation logic)
const validateOrderItems = (orderItems) => {
  // Implement validation logic for order items
  if (!Array.isArray(orderItems)) {
    throw new CustomError.BadRequestError('Order items must be an array');
  }
  orderItems.forEach((item) => {
    if (!item.productId || !item.quantity) {
      throw new CustomError.BadRequestError('Each order item must have a productId and quantity');
    }
  });
};


// Delete Order Function
const deleteOrder = async (req, res) => {
  const { id: orderId } = req.params;

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id: ${orderId}`);
  }

  await Order.deleteOne({ _id: orderId });
  res.status(StatusCodes.OK).json({ msg: 'Order deleted successfully' });
};

const uploadOrders = async (req, res) => {
    try {
        console.log(req.file.filename);
        console.log(req.file.destination);
        // Assuming the file is saved to disk and you want to read its content
        const filePath = path.join(req.file.destination, req.file.filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const orders = JSON.parse(fileContent);

        await Promise.all(orders.map(order => Order.create(order)));

        res.status(200).send({ message: 'Orders uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to upload orders' });
    }
};
  
module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
  deleteOrder, // Export deleteOrder
  uploadOrders,
};
