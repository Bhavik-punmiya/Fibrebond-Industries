const mongoose = require('mongoose');
const User = require('../models/UserSchema'); // Import the User schema
const {StatusCodes} = require('http-status-codes');
// @desc    Get all users
// @route   GET /api/v1/users
// @access  Public
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password -jwtToken'); // Exclude password and jwtToken fields
    res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// @desc    Get single user by email or phone number
// @route   POST /api/v1/users/getUser
// @access  Public
const getUser = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;
    const user = await User.findOne({ $or: [{ email }, { phone: phoneNumber }] }).select('-password -jwtToken'); // Exclude password and jwtToken fields
    if (!user) {
      throw new CustomError.NotFoundError('User not found');
    }
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
};

// @desc    Update a user by email or phone number
// @route   PATCH /api/v1/users/updateUser
// @access  Private (Admin)
const updateUser = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;
    let user = await User.findOne({ $or: [{ email }, { phone: phoneNumber }] });
    if (!user) {
      throw new CustomError.NotFoundError('User not found');
    }
    user = await User.findOneAndUpdate({ $or: [{ email }, { phone: phoneNumber }] }, req.body, { new: true, runValidators: true }).select('-password -jwtToken'); // Exclude password and jwtToken fields
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// @desc    Delete a user by email or phone number
// @route   DELETE /api/v1/users/deleteUser
// @access  Private (Admin)
const deleteUser = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;
    const user = await User.findOneAndDelete({ $or: [{ email }, { phone: phoneNumber }] }).select('-password -jwtToken'); // Exclude password and jwtToken fields
    if (!user) {
      throw new CustomError.NotFoundError('User not found');
    }
    res.status(StatusCodes.OK).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
