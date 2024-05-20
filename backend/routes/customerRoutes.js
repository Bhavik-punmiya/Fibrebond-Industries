const express = require('express');
const router = express.Router();
const upload = require('../utils/multerConfig');

const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  uploadAllCustomers,
} = require('../controllers/customerController');

// GET all customers
router.get('/', getAllCustomers);

// GET single customer by ID
router.get('/:id', getCustomerById);

// POST create a new customer
router.post('/', createCustomer);

// PATCH update a customer by ID
router.patch('/:id', updateCustomer);

// DELETE delete a customer by ID
router.delete('/:id', deleteCustomer);

// POST upload all customers from JSON file
router.post('/upload-customers', upload.single('customers'), uploadAllCustomers);

module.exports = router;
