const Cart = require('../models/cartSchema');
const User = require('../models/UserSchema');
const { StatusCodes } = require('http-status-codes');
const numWords = require('num-words'); // Import a library to convert numbers to words

// @desc    Get cart by user ID
// @route   GET /api/v1/cart/:userId
// @access  Private
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.userId);
    if (!cart) {
      throw new CustomError.NotFoundError('Cart not found');
    }
    res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const calculateTotals = (items) => {
    let totals = {
      qty: 0,
      price: 0,
      discount: 0,
      cgst: 0,
      sgst: 0,
      grandTotal: 0,
      totalInWords: ''
    };
  
    items.forEach(item => {
      const cgst = (item.price * 0.025).toFixed(2);
      const sgst = (item.price * 0.025).toFixed(2);
      const total = (item.price + parseFloat(cgst) + parseFloat(sgst)).toFixed(2);
  
      item.cgst = parseFloat(cgst);
      item.sgst = parseFloat(sgst);
      item.total = parseFloat(total);
      item.amount = item.price - item.discount;
  
      totals.qty += item.qty;
      totals.price += item.price;
      totals.discount += item.discount;
      totals.cgst += parseFloat(cgst);
      totals.sgst += parseFloat(sgst);
      totals.grandTotal += parseFloat(total);
    });
  
    totals.totalInWords = numberToWords(totals.grandTotal); // Assuming numberToWords is a function to convert numbers to words
  
    return totals;
  };
  
  const numberToWords = (num) => {
    // Simplified version; you can use a library or improve this function
    const a = [
      '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
      'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];
    const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const g = ['', 'thousand', 'million', 'billion'];
  
    let str = '';
    let grp = 0;
    let numStr = num.toString();
    let len = numStr.length;
    let triplet;
  
    while (len > 0) {
      triplet = parseInt(numStr.substring(len - 3, len), 10);
      len -= 3;
  
      if (triplet) {
        let h = Math.floor(triplet / 100);
        let t = triplet % 100;
        let t1 = Math.floor(t / 10);
        let t2 = t % 10;
  
        if (str) {
          str = ' ' + str;
        }
        if (g[grp]) {
          str = g[grp] + str;
        }
        if (t > 19) {
          str = b[t1] + (t2 ? '-' + a[t2] : '') + str;
        } else if (t) {
          str = a[t] + str;
        }
        if (h) {
          str = a[h] + ' hundred' + str;
        }
      }
      grp++;
    }
  
    return str || 'zero';
  };
  
  const updateCartByUserId = async (req, res) => {
    const userId = req.params.userId;
    const { items } = req.body;
  
    try {
      let cart = await Cart.findById(userId);
      if (!cart) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Cart not found' });
      }
  
      items.forEach(item => {
        const cgst = (item.price * 0.025).toFixed(2);
        const sgst = (item.price * 0.025).toFixed(2);
        const total = (item.price + parseFloat(cgst) + parseFloat(sgst)).toFixed(2);
  
        item.cgst = parseFloat(cgst);
        item.sgst = parseFloat(sgst);
        item.total = parseFloat(total);
        item.amount = item.price - item.discount;
      });
  
      cart.items = items;
      cart.totals = calculateTotals(items);
  
      await cart.save();
  
      res.status(StatusCodes.OK).json({ cart });
    } catch (error) {
      console.error('Error updating cart:', error.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Server error' });
    }
  };
// @desc    Clear cart
// @route   DELETE /api/v1/cart/:userId
// @access  Private
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.userId);
    if (!cart) {
      throw new CustomError.NotFoundError('Cart not found');
    }

    cart.items = [];
    cart.totals = {
      qty: 0,
      price: 0.0,
      discount: 0.0,
      cgst: 0.0,
      sgst: 0.0,
      grandTotal: 0.0,
      totalInWords: '',
    };

    await cart.save();

    res.status(StatusCodes.OK).json({ message: 'Cart cleared successfully', cart });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// @desc    Get all carts
// @route   GET /api/v1/cart
// @access  Public (for testing)
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find({});
    res.status(StatusCodes.OK).json({ carts });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// @desc    Create a new cart (for testing purposes)
// @route   POST /api/v1/cart
// @access  Public (for testing)
const createCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const existingCart = await Cart.findById(userId);
    if (existingCart) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Cart already exists for this user' });
    }

    const cart = new Cart({
      _id: userId,
      items: [],
      totals: {
        qty: 0,
        price: 0.0,
        discount: 0.0,
        cgst: 0.0,
        sgst: 0.0,
        grandTotal: 0.0,
        totalInWords: '',
      },
    });

    await cart.save();
    res.status(StatusCodes.CREATED).json({ cart });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const initializeCartsForExistingUsers = async (req, res) => {
    try {
      // Fetch all users
      const users = await User.find({});
  
      // Loop through each user and check if they have a cart
      for (const user of users) {
        const cart = await Cart.findById(user._id);
  
        if (!cart) {
          // If the user doesn't have a cart, create one
          const newCart = new Cart({
            _id: user._id,
            items: [],
            totals: {
              qty: 0,
              price: 0,
              discount: 0,
              cgst: 0,
              sgst: 0,
              grandTotal: 0,
              totalInWords: ''
            }
          });
  
          await newCart.save();
          console.log(`Initialized cart for user ${user.name}`);
        }
      }
  
      res.status(StatusCodes.OK).json({ message: 'Cart initialization for existing users completed.' });
    } catch (err) {
      console.error('Error initializing carts for existing users:', err.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Server error' });
    }
  };

  const getCartStats = async (req, res) => {
    try {
      // Total number of users
      const totalUsers = await User.countDocuments();
  
      // Total number of carts
      const totalCarts = await Cart.countDocuments();
  
      // Total number of empty carts
      const emptyCarts = await Cart.countDocuments({ 'items': { $exists: false } });
  
      // Total number of products in all carts
      const totalProductsInCarts = await Cart.aggregate([
        { $match: { 'items': { $exists: true, $ne: [] } } },
        { $group: { _id: null, totalProducts: { $sum: { $size: '$items' } } } }
      ]);
  
      // Total value in all carts
      const totalValueInCarts = await Cart.aggregate([
        { $match: { 'totals.grandTotal': { $exists: true } } },
        { $group: { _id: null, totalValue: { $sum: '$totals.grandTotal' } } }
      ]);
  
      // Total CGST and SGST in all carts
      const totalCGST = await Cart.aggregate([
        { $match: { 'totals.cgst': { $exists: true } } },
        { $group: { _id: null, totalCGST: { $sum: '$totals.cgst' } } }
      ]);
  
      const totalSGST = await Cart.aggregate([
        { $match: { 'totals.sgst': { $exists: true } } },
        { $group: { _id: null, totalSGST: { $sum: '$totals.sgst' } } }
      ]);
  
      // Construct the response object
      const cartStats = {
        totalUsers,
        totalCarts,
        emptyCarts,
        totalProductsInCarts: totalProductsInCarts.length > 0 ? totalProductsInCarts[0].totalProducts : 0,
        totalValueInCarts: totalValueInCarts.length > 0 ? totalValueInCarts[0].totalValue : 0,
        totalCGST: totalCGST.length > 0 ? totalCGST[0].totalCGST : 0,
        totalSGST: totalSGST.length > 0 ? totalSGST[0].totalSGST : 0
        // Add more stats as needed
      };
  
      res.status(200).json({ cartStats });
    } catch (error) {
      console.error('Error fetching cart stats:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };
  

module.exports = {
  getCart,
  updateCartByUserId,
  clearCart,
  getAllCarts,
  createCart,
  initializeCartsForExistingUsers,
  getCartStats
};
