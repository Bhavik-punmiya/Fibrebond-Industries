const express = require('express');
const router = express.Router();
const upload = require('../utils/multerConfig');

const {
  getAllCustomers,
  getCustomerById,
  createOrUpdateCustomer,
  deleteCustomer,
  uploadAllCustomers,
} = require('../controllers/customerController');

// GET all customers
router.get('/', getAllCustomers);

// GET single customer by ID
router.get('/:id', getCustomerById);

// POST create or update a customer
router.post('/', createOrUpdateCustomer);

// PATCH update a customer by ID (this route can be omitted if using createOrUpdateCustomer for both create and update)
router.patch('/:id', createOrUpdateCustomer);

// DELETE delete a customer by ID
router.delete('/:id', deleteCustomer);

// POST upload all customers from JSON file
router.post('/upload-customers', upload.single('customers'), uploadAllCustomers);

module.exports = router;
