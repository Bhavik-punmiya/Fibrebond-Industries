require('dotenv').config(); // Load environment variables
require('express-async-errors'); // Enable async error handling

const express = require('express');
const cors = require('cors'); // Import cors middleware
const bodyParser = require('body-parser');
const multer = require('multer'); // Import multer for file uploads
const app = express();

// Database connection
const connectDB = require('./db/connect');

// Routes
const orderRouter = require('./routes/orderRoutes');
const productRouter = require('./routes/productRoutes');
const customerRouter = require('./routes/customerRoutes');
const uploadRouter = require('./routes/uploadRoutes');
const roleRoutes = require('./routes/rolesRoutes');
const familyRoutes = require('./routes/familyRoutes');

// Middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Configure body parsers
app.use(express.json());


// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Use cors middleware
app.use(cors({
  origin: '*', // Adjust according to your needs; '*' allows all origins
  credentials: true, // Include this if your request uses credentials
}));

// Attach routes
app.use('/api/v1/customers', customerRouter); // Apply multer to customer route
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/uploads', uploadRouter);
app.use('/api/v1/roles', roleRoutes);
app.use('/api/v1/family', familyRoutes);

// Error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

// Connect to MongoDB and start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI); // Ensure MONGO_URI is defined in your .env file
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
  }
};

start();
