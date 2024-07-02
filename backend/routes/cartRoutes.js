const express = require('express');
const router = express.Router();
const { 
  getCart, 
  updateCartByUserId, 
  clearCart, 
  getAllCarts, 
  createCart, 
  initializeCartsForExistingUsers,
  getCartStats
} = require('../controllers/cartController');

// Define more specific routes before general routes

// Get cart by user ID
router.get('/user/:userId', getCart);

// Update cart by user ID
router.patch('/user/:userId', updateCartByUserId);

// Clear cart by user ID
router.delete('/user/:userId', clearCart);

// Create a new cart (for testing purposes)
router.post('/user/', createCart);

// Initialize carts for existing users
router.post('/initialize-carts', initializeCartsForExistingUsers);

// Get all carts (for testing purposes)
router.get('/', getAllCarts);

// Get cart stats
router.get('/cart-stats', getCartStats);

module.exports = router;
