# 🚀 Railway'ga Deploy Qilish

## Step 1: MongoDB Atlas (Free Cloud)

1. **Hisob yarating:** https://www.mongodb.com/cloud/atlas/register
2. **Database yarating:**
   - "Build a Database" → FREE → AWS
   - Cluster name: habitflow
3. **User yarating:**
   - Security → Database Access → Add New User
   - Username: habitflow_user
   - Password: Kuchli password
4. **Network Access:**
   - Network Access → Add IP Address → 0.0.0.0/0
5. **Connection String oling:**
   - Clusters → Connect → Connect your application
   - Copy connection string
   - `<password>` ni o'z password bilan almashtiring

**Connection String:**
```
mongodb+srv://habitflow_user:your_password@cluster0.xxxxx.mongodb.net/habitflow
```

---

## Step 2: Telegram Bot

1. **@BotFather ni oching** (Telegram'da)
2. `/newbot` yuboring
3. Bot name: HabitFlow Bot
4. Username: habitflow_bot
5. **Token ni saqlang:**
   ```
   1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
   ```

---

## Step 3: Railway'ga Deploy

### 3.1 Hisob yarating
- https://railway.app ga kiring
- "Start a New Project" tugmasini bosing
- GitHub bilan ulaning

### 3.2 Backend Deploy
1. "Deploy from GitHub repo" ni tanlang
2. `neoly` repository ni tanlang
3. **Service Settings:**
   - Name: habitflow-backend
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

### 3.3 Environment Variables
Railway Dashboard → Variables → Add:

```
MONGODB_URI=mongodb+srv://habitflow_user:password@cluster0.xxxxx.mongodb.net/habitflow
PORT=3000
BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
BOT_USERNAME=habitflow_bot
WEBAPP_URL=https://your-frontend-url.vercel.app
```

### 3.4 Backend Deploy!
- Railway automatic build qiladi
- Deploy tugmasini bosing
- **Backend URL olinadi:**
  ```
  https://habitflow-production.up.railway.app
  ```

---

## Step 4: Frontend Deploy (Vercel)

### 4.1 Vercel Setup
- https://vercel.com ga kiring
- New Project → GitHub → `neoly` repo

### 4.2 Frontend Settings
- Framework Preset: Vite
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`

### 4.3 Environment Variable
```
VITE_API_URL=https://habitflow-production.up.railway.app
```

### 4.4 Deploy!
- Frontend URL olinadi:
  ```
  https://habitflow.vercel.app
  ```

---

## Step 5: URL'ni Ulash

### Railway Backend'ga Frontend URL qo'shing:
```
WEBAPP_URL=https://habitflow.vercel.app
```

### Vercel Frontend'ga Backend URL qo'shing:
```
VITE_API_URL=https://habitflow-production.up.railway.app
```

### Redeploy qiling!

---

## Step 6: Telegram Mini App

1. **@BotFather ga o'ting**
2. `/newapp` yuboring
3. Botni tanlang
4. **Mini App sozlang:**
   - Title: "HabitFlow"
   - Description: "Ezgu odatlarni shakllantiring"
   - Photo: (optional)
   - **Mini App URL:** `https://habitflow.vercel.app`
   - Short name: `habitflow`

---

## Step 7: Test Qilish! 🎉

1. Telegram'da bot'ni oching
2. `/start` yuboring
3. **"Open HabitFlow"** tugmasini bosing
4. Mini App ochiladi! 🚀

---

## ✅ Tugadi!

**Production Endpoints:**
- 🌐 Frontend: https://habitflow.vercel.app
- 🔧 Backend: https://habitflow-production.up.railway.app
- 🤖 Bot: @habitflow_bot
- 📊 MongoDB: MongoDB Atlas (Cloud)

**Features ishlaydi:**
- ✅ Habit yaratish
- ✅ Daily check-in
- ✅ Progress tracking
- ✅ Circular charts
- ✅ Daily reminders (9 AM UTC)
- ✅ O'zbek tili

---

## 🆘 Troubleshooting

### Mini App ochilmaydi:
- HTTPS ishlatilganini tekshiring
- URL to'g'ri BotFather'ga kiritilganini tekshiring

### Backend xatosi:
- Environment variables to'g'ri kiritilganini tekshiring
- Railway logs ga qarang (Dashboard → Logs)

### Database xatosi:
- MongoDB Atlas connection string ni tekshiring
- Network Access 0.0.0.0/0 qilganingizni tekshiring

---

## 💡 Tips

- Railway free tier yaxshi
- MongoDB Atlas M0 free
- Vercel free tier cheksiz
- Telegram bot bepul

**Hammasi bepul ishlaydi!** 🎉

