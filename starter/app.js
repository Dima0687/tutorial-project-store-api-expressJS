// dotenv
import 'dotenv/config';

// express import
import express from 'express';
const app = express();
import 'express-async-errors';
// mongoDB
import connectDB from './db/connect.js';

// routes
import productsRouter from './routes/products.js';

// middleware import
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error-handler.js';

// middleware json read
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use('/api/v1/products', productsRouter);

// middleware use
app.use(notFoundMiddleware);
app.use(errorMiddleware);


const port = process.env.PORT || 3000


const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
};

start();