const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Public
router.get('/', getAllUsers);

// @desc    Get single user by email or phone number
// @route   POST /api/v1/users/getUser
// @access  Public
router.post('/getUser', getUser);

// @desc    Update a user by email or phone number
// @route   PATCH /api/v1/users/updateUser
// @access  Private (Admin)
router.patch('/updateUser', updateUser);

// @desc    Delete a user by email or phone number
// @route   DELETE /api/v1/users/deleteUser
// @access  Private (Admin)
router.delete('/deleteUser', deleteUser);

module.exports = router;
