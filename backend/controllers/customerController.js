const User = require('../models/UserSchema');
const Customer = require('../models/Customer');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const fs = require('fs');
const path = require('path');
const { ObjectId } = require('mongodb')
// @desc    Get all customers
// @route   GET /api/v1/customers
// @access  Public
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(StatusCodes.OK).json({ customers });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// @desc    Get single customer by ID
// @route   GET /api/v1/customers/:id
// @access  Public
const getCustomerById = async (req, res) => {
  const { id: customerId } = req.params;
  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      throw new CustomError.NotFoundError(`Customer with ID ${customerId} not found`);
    }
    res.status(StatusCodes.OK).json({ customer });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
};

const createOrUpdateCustomer = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    // Find the user by email or phone number
    const user = await User.findOne({ $or: [{ email }, { phone: phoneNumber }] });
    console.log("User found:", user._id.toString());
    
    if (!user) {
      throw new CustomError.NotFoundError('User not found');
    }

    // Check if a customer record already exists for this user
    let customer = await Customer.findOne({ _id: user._id });
    console.log("Existing customer:", customer);

    if (customer) {
      console.log("Updating existing customer...");
      // Update existing customer
      Object.keys(req.body).forEach((key) => {
        customer[key] = req.body[key];
      });
      await customer.save();
    } else {
      console.log('Creating new customer...');
      // Create a new customer
      // const id = new ObjectId(user._id.toString());
      customer = new Customer({
        _id: user._id,
        ...req.body
      });
      await customer.save();
    }

    res.status(StatusCodes.OK).json({ customer });
  } catch (error) {
    console.error("Error creating or updating customer:", error.message);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};



// @desc    Update a customer by ID
// @route   PATCH /api/v1/customers/:id
// @access  Private (Admin)
const updateCustomer = async (req, res) => {
  const { id: customerId } = req.params;
  try {
    const customer = await Customer.findByIdAndUpdate(customerId, req.body, { new: true, runValidators: true });
    if (!customer) {
      throw new CustomError.NotFoundError(`Customer with ID ${customerId} not found`);
    }
    res.status(StatusCodes.OK).json({ customer });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// @desc    Delete a customer by ID
// @route   DELETE /api/v1/customers/:id
// @access  Private (Admin)
const deleteCustomer = async (req, res) => {
  const { id: customerId } = req.params;
  try {
    const customer = await Customer.findByIdAndDelete(customerId);
    if (!customer) {
      throw new CustomError.NotFoundError(`Customer with ID ${customerId} not found`);
    }
    res.status(StatusCodes.OK).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// @desc    Upload all customers from JSON file
// @route   POST /api/v1/customers/upload-customers
// @access  Private (Admin)
const uploadAllCustomers = async (req, res) => {
  try {
    const filePath = path.join(req.file.destination, req.file.filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const customers = JSON.parse(fileContent);
    await Customer.insertMany(customers);
    res.status(StatusCodes.OK).send({ message: 'Customers uploaded successfully' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to upload customers' });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createOrUpdateCustomer,
  updateCustomer,
  deleteCustomer,
  uploadAllCustomers,
};
