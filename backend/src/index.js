import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { ensureFileStore } from './store/fileStore.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const clientOrigins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = new Set([
  ...clientOrigins,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'https://student-dasboard-frontend.vercel.app'
]);
let storageMode = 'json-file';

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  }
}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api', (_req, res) => {
  res.json({
    message: 'Student Task Manager API',
    health: '/api/health'
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', storage: storageMode });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use((err, _req, res, _next) => {
  if (err.name === 'ZodError') {
    return res.status(400).json({ message: err.errors[0]?.message || 'Invalid request data' });
  }

  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Something went wrong' });
});

async function start() {
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      storageMode = 'mongodb';
      console.log('Connected to MongoDB');
    } catch (error) {
      await ensureFileStore();
      storageMode = 'json-file';
      console.warn(`MongoDB unavailable (${error.message}). Using local JSON storage instead.`);
    }
  } else {
    await ensureFileStore();
    storageMode = 'json-file';
    console.log('Using local JSON storage at server/data/db.json');
  }

  app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
