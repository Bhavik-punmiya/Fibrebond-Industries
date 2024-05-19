require('dotenv').config();
require('express-async-errors');
// express

const express = require('express');
const app = express();

// DB connection
const connectDB = require('./db/connect');

// routers
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');




// Routers 
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);


// Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);





const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();