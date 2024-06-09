const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    sparse: true // Allow either email or phone to be optional
  },
  phone: {
    type: String,
    unique: true,
    sparse: true // Allow either phone or email to be optional
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'shopmanager', 'customer'],
    default: 'customer'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  jwtToken: {
    type: String, // Field to store JWT token
    default: null
  }
});

// Custom validation to ensure either email or phone is provided
userSchema.pre('validate', function(next) {
  if (!this.email && !this.phone) {
    this.invalidate('email', 'Either email or phone number is required');
    this.invalidate('phone', 'Either email or phone number is required');
  }
  next();
});

// Check if the model already exists before defining it
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
