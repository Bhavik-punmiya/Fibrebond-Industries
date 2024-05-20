const express = require('express');
const router = express.Router();
const upload = require('../utils/multerConfig'); // Adjust the path as necessary

const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
  deleteOrder, // Add deleteOrder to the import
  uploadOrders,
} = require('../controllers/orderController');

router
  .route('/')
  .post(createOrder)
  .get(getAllOrders);

router.route('/showAllMyOrders').get(getCurrentUserOrders);

router
  .route('/:id')
  .get(getSingleOrder)
  .patch(updateOrder)
  .delete(deleteOrder); // Add the delete route here

// Applying multer middleware to the uploadOrders route
router.post('/upload-orders', upload.single('orders'), uploadOrders);

module.exports = router;
