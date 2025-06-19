import express from 'express';
import dotenv from 'dotenv';
import { sql } from './config/db.js';

import transactionsRoute from './routes/transactionsRoute.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();

// middleware
app.use(rateLimiter);
app.use(express.json());

// our custom simple middleware
app.use((req, res, next) => {
  console.log('Hey we hit a req, the method is', req.method);
  next();
});

const PORT = process.env.PORT || 5001;

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;

    console.log('Database initialized successfully');
  } catch (error) {
    console.log('Error initializing DB', error);
    process.exit(1); //status code 1 means failure, 0 success
  }
}

app.get('/', (req, res) => {
  res.send("It's working");
});

app.use('/api/transactions', transactionsRoute);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is up and running on PORT:', PORT);
  });
});
