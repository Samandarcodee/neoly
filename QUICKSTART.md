# HabitFlow - Quick Start Guide 🚀

Get HabitFlow up and running in 5 minutes!

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- A Telegram account

## Quick Setup

### 1. Install Dependencies

```bash
npm run install:all
```

This will install dependencies for root, backend, and frontend.

### 2. Set Up MongoDB

**Option A: Local MongoDB**
- Install and start MongoDB on your system
- Default connection: `mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud)**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get your connection string
- Use it as your `MONGODB_URI`

### 3. Configure Backend

```bash
cd backend
cp env.example .env
# Edit .env with your settings
```

Minimal `.env` for testing:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/habitflow
BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
BOT_USERNAME=your_bot_username
WEBAPP_URL=http://localhost:5173
```

> **Note:** For production, use HTTPS for `WEBAPP_URL`. For local testing with ngrok, use the ngrok HTTPS URL.

### 4. Configure Frontend

```bash
cd frontend
cp env.example .env
```

The default `frontend/.env` should be fine:
```env
VITE_API_URL=http://localhost:3000
```

### 5. Get Your Bot Token

1. Open Telegram and search for `@BotFather`
2. Send `/newbot`
3. Follow instructions and get your bot token
4. Add it to `backend/.env` as `BOT_TOKEN`

### 6. Run the Application

**Development mode (both frontend and backend):**

```bash
npm run dev
```

Or run separately:
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

### 7. Test Locally with ngrok (Optional)

Since Telegram requires HTTPS for Mini Apps, use ngrok for local testing:

```bash
# Install ngrok
brew install ngrok  # macOS
# or download from https://ngrok.com/

# Start your frontend
cd frontend && npm run dev

# In another terminal, expose it
ngrok http 5173

# Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
# Update backend/.env: WEBAPP_URL=https://abc123.ngrok.io
# Update Mini App URL in BotFather
```

### 8. Create Your Mini App

1. In BotFather, send `/newapp`
2. Select your bot
3. Enter title: "HabitFlow"
4. Enter description: "Build habits, track progress daily"
5. Enter URL: Your ngrok URL or production URL
6. Done!

### 9. Test It!

1. Open your bot in Telegram
2. Send `/start`
3. Click "Open HabitFlow" button
4. Start creating habits!

## Production Deployment

### Deploy Frontend

**Vercel:**
```bash
cd frontend
vercel
```

**Netlify:**
```bash
cd frontend
netlify deploy
```

### Deploy Backend

**Railway/Render:**
```bash
cd backend
# Connect your GitHub repo
# Set environment variables
# Deploy!
```

Don't forget to update:
- `WEBAPP_URL` in backend `.env` to your production frontend URL
- Mini App URL in BotFather to your production URL

## Project Structure

```
habitflow/
├── backend/          # Node.js + Express + MongoDB
│   ├── models/      # Database models
│   ├── routes/      # API routes
│   ├── config/      # Cron jobs & config
│   └── server.js    # Main server file
├── frontend/           # React + Vite
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API services
│   │   ├── hooks/      # Custom hooks
│   │   └── App.jsx     # Main app
│   └── public/
├── README.md
├── TELEGRAM_SETUP.md
└── package.json
```

## Features Check

- ✅ Telegram WebApp SDK integration
- ✅ Create habits with custom title and duration
- ✅ Daily check-in functionality
- ✅ Progress tracking with visual bars
- ✅ Motivational messages
- ✅ Daily reminders (runs at 9 AM UTC)
- ✅ Clean, modern UI with TailwindCSS
- ✅ Responsive mobile-first design

## Troubleshooting

**"Cannot connect to backend"**
- Make sure backend is running on port 3000
- Check `VITE_API_URL` in `frontend/.env`

**"MongoDB connection failed"**
- Verify MongoDB is running
- Check `MONGODB_URI` in `backend/.env`

**"Mini App not opening"**
- Use HTTPS (ngrok for local testing)
- Update Mini App URL in BotFather
- Check browser console for errors

**"Reminders not working"**
- Verify `BOT_TOKEN` is set correctly
- Check that cron job started (should see log in console)
- Make sure users have checked in at least once

## Need Help?

- Check `README.md` for detailed documentation
- Check `TELEGRAM_SETUP.md` for bot setup
- Read backend logs for error messages
- Check frontend browser console for client errors

## Next Steps

1. Customize the UI to match your brand
2. Add more habit categories
3. Implement streaks feature
4. Add social sharing
5. Create analytics dashboard

Happy coding! 🎉

