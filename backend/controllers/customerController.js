const Customer = require('../models/Customer');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

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

// @desc    Create a new customer
// @route   POST /api/v1/customers
// @access  Public
const createCustomer = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    // Check if the customer already exists
    const existingCustomer = await Customer.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingCustomer) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Customer already exists' });
    }

    const customer = new Customer({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,  // Assuming you handle password hashing elsewhere
    });

    await customer.save();
    res.status(StatusCodes.CREATED).json({ customer });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// @desc    Update a customer by email or phone number
// @route   PATCH /api/v1/customers
// @access  Private (Customer)
// @desc    Update a customer by email or phone number
// @route   PATCH /api/v1/customers
// @access  Private (Customer)
const updateCustomer = async (req, res) => {
  const { email, phoneNumber } = req.body;

  try {
    // Find the customer by email or phone number
    const customer = await Customer.findOne({ $or: [{ email }, { phoneNumber }] });
    if (!customer) {
      throw new CustomError.NotFoundError(`Customer not found`);
    }

    // Update the customer with new details
    const updateData = { ...req.body };

    Object.keys(updateData).forEach((key) => {
      customer[key] = updateData[key];
    });

    await customer.save();
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
  createCustomer,
  updateCustomer,
  deleteCustomer,
  uploadAllCustomers,
};
