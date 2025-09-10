import express from 'express';
import dotenv from 'dotenv';
import { initDB } from './config/db.js';
import transactionsRoute from './routes/transactionsRoute.js';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';
import { Redis } from '@upstash/redis';

dotenv.config();

const app = express();
app.use(cors());

// middleware
app.use(rateLimiter);
app.use(express.json());

// our custom simple middleware
app.use((req, res, next) => {
  console.log('Hey we hit a req, the method is', req.method);
  next();
});

const PORT = process.env.PORT || 5001;

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/transactions', transactionsRoute);

app.get('/api/ping-redis', async (req, res) => {
  try {
    const pong = await Redis.fromEnv().ping();
    res.json({ status: 'ok', redis: pong });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is up and running on PORT:', PORT);
  });
});
