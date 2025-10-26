# HabitFlow - Telegram Mini App 🚀

A beautiful Telegram Mini App for building habits and tracking daily progress.

## 📋 Features

- **Telegram Integration**: Seamless login using Telegram WebApp SDK
- **Habit Creation**: Set custom goals and durations
- **Daily Check-ins**: Track progress with daily check-ins
- **Progress Tracking**: Visual progress bars and motivational messages
- **Daily Reminders**: Automated Telegram messages to keep you on track
- **Clean UI**: Modern, minimalist design with TailwindCSS

## 🛠️ Tech Stack

- **Frontend**: React + Vite + Telegram WebApp SDK + TailwindCSS
- **Backend**: Node.js + Express + MongoDB
- **Scheduler**: node-cron for daily reminders

## 📦 Installation

### 1. Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend and frontend dependencies
npm run install:all
```

### 2. Set Up MongoDB

Make sure MongoDB is running on your system, or use MongoDB Atlas.

### 3. Configure Backend

Copy the example environment file and fill in your details:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/habitflow
BOT_TOKEN=your_telegram_bot_token_here
BOT_USERNAME=your_bot_username
WEBAPP_URL=https://your-miniapp-url.com
```

**Getting a Telegram Bot Token:**

1. Open Telegram and search for [@BotFather](https://t.me/BotFather)
2. Send `/newbot` and follow the instructions
3. Copy the bot token and paste it in `.env`
4. Send `/newapp` to BotFather and create a Mini App
5. Set the Mini App URL to your deployed frontend URL

### 4. Configure Frontend

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

## 🚀 Running the Application

### Development Mode

Run both backend and frontend:

```bash
npm run dev
```

Or separately:

```bash
# Backend (Terminal 1)
cd backend
npm run dev

# Frontend (Terminal 2)
cd frontend
npm run dev
```

Backend runs on: `http://localhost:3000`
Frontend runs on: `http://localhost:5173`

### Production Build

Build the frontend:

```bash
cd frontend
npm run build
```

The built files will be in `frontend/dist/`

## 📱 Using the Mini App

1. Start your Telegram bot
2. Send `/start` to the bot
3. Click "Open HabitFlow" or the web app button
4. The Mini App will open in Telegram
5. Create your first habit!
6. Check in daily to track your progress

## 🔌 API Endpoints

### Create Habit
```
POST /api/habits
Body: { userId, title, duration }
```

### Get User Habits
```
GET /api/habits/:userId
```

### Update Progress (Check-in)
```
PATCH /api/habits/:id
```

### Get Single Habit
```
GET /api/habits/single/:id
```

## 🎯 How It Works

1. **User opens the Mini App** → Welcome screen with instructions
2. **Creates a habit** → Sets title and duration (e.g., "Run for 30 days")
3. **Daily check-in** → Each day the user marks the task as done
4. **Progress tracking** → Shows completion percentage and remaining days
5. **Motivational messages** → Different messages based on progress
6. **Daily reminders** → Cron job sends Telegram reminders at 9 AM UTC
7. **Goal completion** → Celebration when the user completes their goal!

## 📊 Database Schema

```javascript
{
  userId: String,        // Telegram user ID
  title: String,         // Habit title
  duration: Number,      // Total days
  currentDay: Number,    // Days completed
  startDate: Date,       // When habit was created
  completed: Boolean,    // Is the habit completed
  lastCheckIn: Date,     // Last check-in date
  checkInHistory: Array  // History of all check-ins
}
```

## 🌐 Deployment

### Backend

Deploy to services like:
- Railway
- Render
- Heroku
- DigitalOcean

### Frontend

Deploy to:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

Don't forget to update the `WEBAPP_URL` in your backend `.env` file!

## 🤖 Setting Up the Telegram Bot

1. Create a bot with BotFather
2. Get the bot token
3. Set up a bot command to open the Mini App:

```bash
/setcommands
```

Add:
```
start - Open HabitFlow
```

4. Create a button in your bot to open the Mini App or send this message:

```python
import requests

BOT_TOKEN = "your_bot_token"
CHAT_ID = "user_chat_id"

send_message = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
params = {
    "chat_id": CHAT_ID,
    "text": "Welcome to HabitFlow! 🚀",
    "reply_markup": {
        "inline_keyboard": [[
            {
                "text": "Open HabitFlow",
                "web_app": {"url": "YOUR_MINI_APP_URL"}
            }
        ]]
    }
}

requests.post(send_message, json=params)
```

## 📝 License

MIT

## 🙏 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Made with ❤️ for building better habits

