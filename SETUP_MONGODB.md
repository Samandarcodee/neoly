# MongoDB Setup for HabitFlow

## Option 1: MongoDB Atlas (Cloud - Recommended) 🌐

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for free
3. Create a new cluster (choose FREE tier)
4. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
5. Update `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/habitflow
   ```

## Option 2: Local MongoDB (Windows) 💻

1. Download MongoDB: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Server
3. Add MongoDB to PATH (optional but recommended)
4. Start MongoDB:
   ```powershell
   # Open new terminal
   mongod
   ```
5. Your connection string in `backend/.env` is already correct:
   ```env
   MONGODB_URI=mongodb://localhost:27017/habitflow
   ```

## Option 3: Docker (Quick Setup) 🐳

If you have Docker installed:

```powershell
docker run -d -p 27017:27017 --name mongodb mongo
```

Then use in `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/habitflow
```

## After Setting Up MongoDB:

Restart your backend server (press Ctrl+C and run `npm run dev` again).

---

**Quick Test:** Your backend is running on http://localhost:3000
Your frontend is running on http://localhost:5174

Open http://localhost:5174 in your browser to see the app!

