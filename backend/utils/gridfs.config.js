const mongoose = require('mongoose');
const { GridFSBucket, ObjectId } = require('mongodb');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

async function initMongoDB() {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
    const conn = await mongoose.connection;

    const gridFSBucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
    console.log('GridFSBucket initialized');
    return gridFSBucket;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

module.exports ={ initMongoDB};
