# 🚀 HabitFlow - Quick Start

## Your App is Running! ✅

- **Frontend:** http://localhost:5174
- **Backend:** http://localhost:3000

## Open the App

Just open your browser and go to:
👉 **http://localhost:5174**

## Current Status

✅ Frontend Server: Running  
✅ Backend Server: Running  
❌ MongoDB: Not connected

## To Complete Setup:

### Fast Option - MongoDB Atlas (5 minutes):

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Click "Build a Database" → Choose FREE tier
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Edit `backend/.env` and paste the connection string
7. Restart: Press `Ctrl+C` then run `npm run dev` again

### Or Install Local MongoDB:

1. Download: https://www.mongodb.com/try/download/community
2. Install
3. In a NEW terminal, run: `mongod`
4. Your `backend/.env` already has the correct connection string

## Test the App:

Once MongoDB is connected:
- Open http://localhost:5174 in browser
- The app should work!

---

**Tip:** If you just want to test the UI without MongoDB, the frontend will still load but you can't save data.

