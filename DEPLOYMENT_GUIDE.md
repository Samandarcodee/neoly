# HabitFlow - Production Deployment Guide

## 🚀 Telefondan Ishga Tushirish (To'liq Yo'riqnoma)

### Option 1: MongoDB Atlas (Cloud - Free) ✅ RECOMMENDED

1. **MongoDB Atlas'ga kiring**
   - Veb-sahifa: https://www.mongodb.com/cloud/atlas/register
   - Account yarating (free)

2. **Database yarating**
   - "Build a Database" → "FREE" → Create
   - Region: Eng yaqin (masalan: AWS, Singapore)
   - Cluster name: habitflow (yoki istalgan)

3. **Connection String oling**
   - Security → Database Access → Add New Database User
   - Username va Password yarating
   - Network Access → Add IP Address → "Allow Access from Anywhere" (0.0.0.0/0)
   - Clusters → Connect → Connect your application
   - Copy connection string

4. **Backend .env yangilang**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/habitflow
BOT_TOKEN=your_bot_token
BOT_USERNAME=your_bot_username
WEBAPP_URL=https://your-miniapp.vercel.app
```

### Option 2: Local MongoDB

Windows uchun:
1. https://www.mongodb.com/try/download/community dan yuklab oling
2. Install qiling
3. `mongod` ni bosib qo'ying

---

## 2️⃣ Telegram Bot Qo'shing

1. **BotFather oching** - Telegram'da `@BotFather` qidiring
2. `/newbot` yuboring
3. Bot nomi: HabitFlow
4. Username: habitflow_bot (yoki boshqa)
5. **Token** ni saqlang!

6. **Mini App yarating**
   - BotFather'da: `/newapp`
   - Botni tanlang
   - Title: "HabitFlow - Odatlar Tracker"
   - Description: "Ezgu odatlarni shakllantiring, kun sayin rivojlan"
   - Photo: (optional) telegram icon
   - URL: Deploy qilinayotgan frontend URL

---

## 3️⃣ Frontend Deploy (Vercel) ⚡

### 3.1 Vercel'ga kiring
- https://vercel.com ga kiring
- GitHub bilan ulaning

### 3.2 Deploy qiling
```bash
# Project folder'ga kiring
cd C:\Users\Диёрбек\Desktop\neoly\frontend

# Vercel install
npm i -g vercel

# Deploy
vercel

# Folow prompts:
# - Set up? Yes
# - Link to existing? No
# - Project name: habitflow
# - Directory: .
# - Override settings? No
```

### 3.3 Environment Variable
Vercel Dashboard'da:
- Settings → Environment Variables
- Key: `VITE_API_URL`
- Value: Backend URL (keyingi bosqichda olamiz)

### 3.4 Vite Config Yangilash
`vite.config.js` ichida:
```js
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist'
  }
});
```

---

## 4️⃣ Backend Deploy (Railway/Render) ☁️

### Option A: Railway (Oson) ✅

1. **Railway ga kiring**
   - https://railway.app
   - GitHub bilan ulaning

2. **Project yangilang**
   - New Project → Deploy from GitHub
   - `neoly` repository ni tanlang
   - `backend` folder'ni deploy qiling

3. **Environment Variables**
   ```
   PORT=3000
   MONGODB_URI=mongodb+srv://... (Atlas'dan)
   BOT_TOKEN=your_token
   BOT_USERNAME=your_username
   WEBAPP_URL=https://habitflow.vercel.app
   ```

4. **Deploy!**
   - Railway automatic deploy qiladi
   - URL olinadi (masalan: https://habitflow-xxxx.up.railway.app)

### Option B: Render

1. https://render.com
2. New → Web Service
3. GitHub repo'ni tanlang
4. Root Directory: `backend`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Environment variables qo'shing

---

## 5️⃣ URL'ni Ulash 📝

### Backend URL'ni Frontend'ga qo'shing
Vercel Dashboard → Project → Settings → Environment Variables:
```
VITE_API_URL=https://habitflow-xxxx.up.railway.app
```

### Frontend URL'ni Backend'ga qo'shing
Railway/Render → Environment Variables:
```
WEBAPP_URL=https://habitflow.vercel.app
```

### Mini App URL'ni BotFather'ga yuborish
1. BotFather → `/newapp`
2. Botni tanlang
3. URL'ni yangilang: `https://habitflow.vercel.app`

---

## 6️⃣ Test Qilish 🧪

1. Telegram'da bot'ni oching
2. `/start` yuboring
3. "Open HabitFlow" tugmasini bosing
4. Mini App ochilishi kerak!

---

## 7️⃣ Daily Reminder Sozlash ⏰

Backend'da cron job avtomatik ishlaydi:
- Har kuni soat 9:00 UTC
- Har bir incomplete habit uchun
- Telegram'da message yuboradi

---

## 🎉 Tugadi!

Endi loyiha production'da ishlaydi:
- ✅ Frontend: Vercel (HTTPS)
- ✅ Backend: Railway/Render (API)
- ✅ Database: MongoDB Atlas (Cloud)
- ✅ Telegram: Mini App ishlaydi
- ✅ Daily reminders: Cron job

---

## 📱 Use Qilish

1. Telegram'ni oching
2. Bot'ingizni qidiring
3. Mini App tugmasini bosing
4. Odatlaringizni yarating!
5. Har kuni check-in qiling
6. Email/Telegram eslatmalar oling

---

## 🛠️ Troubleshooting

**Mini App ochilmaydi:**
- HTTPS ishlatilganligini tekshiring
- URL'ni to'g'ri BotFather'ga kiritgan bo'lishingizni tekshiring

**Backend xato beradi:**
- MongoDB connection string'ni tekshiring
- Environment variables to'g'ri sozlanganligini tekshiring

**Cron job ishlamaydi:**
- Railway/Render'da background task enabled ekanligini tekshiring
- Server logs'ga qarang

---

## 🎓 Keyingi Bosqichlar

1. Custom domain qo'shing
2. Analytics qo'shing (Google Analytics)
3. Error tracking (Sentry)
4. More features (streaks, achievements)

