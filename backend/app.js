require('dotenv').config(); // Load environment variables
require('express-async-errors'); // Enable async error handling

const express = require('express');
const cors = require('cors'); // Import cors middleware
const app = express();
const mongoose = require('mongoose');
const { initGridFS } = require('./utils/gridfsConfig'); // Import GridFS configuration

// Database connection
const connectDB = require('./db/connect');

// Routes
const orderRouter = require('./routes/orderRouter');
const cartRouter =  require('./routes/cartRoutes');
const productRouter = require('./routes/productRoutes');
const customerRouter = require('./routes/customerRoutes');
const uploadRouter = require('./routes/uploadRoutes');
const roleRoutes = require('./routes/rolesRoutes');
const familyRoutes = require('./routes/familyRoutes');
const userRoutes = require('./routes/userRoutes');
const plansRoutes = require('./routes/plansRoutes');
const invoiceRoutes = require('./routes/invoiceRouter')

// Middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(cors()); // Use cors middleware

// Define your routes here...
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/uploads', uploadRouter);
app.use('/api/v1/roles', roleRoutes);
app.use('/api/v1/family', familyRoutes);
app.use('/api/v1/plans', plansRoutes);
app.use('/api/v1/invoices', invoiceRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

// Connect to MongoDB and start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    initGridFS(mongoose.connection); // Initialize GridFS after connection is established
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
  }
};

start();
