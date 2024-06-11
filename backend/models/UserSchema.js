const mongoose = require('mongoose');
const Family = require('./Family'); // Import the Family schema correctly

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'shopmanager', 'customer'],
    default: 'customer',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  jwtToken: {
    type: String,
    default: null,
  },
  families: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Family' }], // Array of family references
});

// Custom validation to ensure either email or phone is provided
userSchema.pre('validate', function(next) {
  if (!this.email && !this.phone) {
    this.invalidate('email', 'Either email or phone number is required');
    this.invalidate('phone', 'Either email or phone number is required');
  }
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
