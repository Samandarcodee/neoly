import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import habitRoutes from './routes/habits.js';
import { initTelegramBot } from './config/telegram.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/habits', habitRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'HabitFlow Backend is running' });
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/habitflow';
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    // Import cron after DB connection
    import('./config/cron.js');
    // Start Telegram bot if token is provided
    initTelegramBot();
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

