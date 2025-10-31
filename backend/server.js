import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectPostgreSQL } from './config/postgresql.js';
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

// Initialize Telegram bot early so it works even if DB is offline locally
initTelegramBot();

// PostgreSQL Connection
const PORT = process.env.PORT || 3000;

// Connect to PostgreSQL
connectPostgreSQL()
  .then(() => {
    console.log('✅ PostgreSQL connected');
    // Import cron after DB connection
    import('./config/cron.js');
    // Start Telegram bot if token is provided
    initTelegramBot();
  })
  .catch((err) => {
    console.error('❌ PostgreSQL connection error:', err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
