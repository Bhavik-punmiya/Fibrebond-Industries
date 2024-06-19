const mongoose = require('mongoose');

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
    });
    console.log('MongoDB connected');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

module.exports = connectDB;
