import { MongoClient } from 'mongodb';
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const clientPromise = client.connect();

export default clientPromise;
