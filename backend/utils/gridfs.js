// db/connect.js
const { MongoClient } = require('mongodb');
const { GridFSBucket } = require('mongodb');

let gridFSBucket;

async function connectToDatabase(mongoURI) {
  const client = new MongoClient(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    await client.connect();
    const db = client.db(); // Assuming your database name
    gridFSBucket = new GridFSBucket(db);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

function getGridFSBucket() {
  if (!gridFSBucket) {
    throw new Error('GridFS bucket not initialized');
  }
  return gridFSBucket;
}

module.exports = { connectToDatabase, getGridFSBucket };
