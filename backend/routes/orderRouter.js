const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Routes for orders
router.post('/', orderController.createOrder);
router.get('/single/:id', orderController.getOrderById);
router.patch('/single/orderstatus/:id', orderController.updateOrder);
router.delete('/single/:id', orderController.deleteOrder);
router.patch('/single/:id', orderController.updateOrderStatus);
router.get('/all/', orderController.getAllOrders);
router.get('/table/details', orderController.getOrderTableDetails);

module.exports = router;
