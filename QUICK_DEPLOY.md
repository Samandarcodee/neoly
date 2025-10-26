# 🚀 HabitFlow - Tezkor Deploy Qo'llanmasi

## 1️⃣ MongoDB Atlas Setup (5 daqiqa)

1. https://www.mongodb.com/cloud/atlas/register ga kiring
2. Free account yarating
3. "Build a Database" → FREE → AWS → Create
4. Database Access → Add New User (username, password)
5. Network Access → Add IP → 0.0.0.0/0 (All locations)
6. Connect → Connect your application → Connection string ni ko'chiring
7. Connection string'da `<password>` ni o'z password bilan almashtiring

**Masalan:**
```
mongodb+srv://username:password@cluster0.abc123.mongodb.net/habitflow
```

---

## 2️⃣ Backend .env Sozlash

`backend/.env` faylini ochib sozlang:

```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster0.abc123.mongodb.net/habitflow
BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
BOT_USERNAME=habitflow_bot
WEBAPP_URL=https://habitflow.vercel.app
```

**Telegram Bot Token:**
- @BotFather ni oching
- `/newbot` → Token ni copy qiling
- `.env` da `BOT_TOKEN` ga qo'ying

---

## 3️⃣ Frontend Build

```powershell
cd frontend
npm run build
```

`dist` folder paydo bo'ladi.

---

## 4️⃣ Vercel'ga Deploy (Frontend)

### Variant A: Vercel CLI
```powershell
npm i -g vercel
cd neoly/frontend
vercel
```

### Variant B: Vercel Website
1. https://vercel.com ga kiring
2. New Project
3. GitHub repo tanlang
4. Root Directory: `frontend`
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Deploy!

**Environment Variable qo'shing:**
```
VITE_API_URL=https://your-backend-url.com
```

**URL olinadi:**
```
https://habitflow-xxxx.vercel.app
```

---

## 5️⃣ Railway'ga Deploy (Backend)

1. https://railway.app ga kiring
2. New Project → Deploy from GitHub
3. `neoly` repo tanlang
4. Root Directory: `backend`
5. Environment Variables qo'shing:
   ```
   MONGODB_URI=mongodb+srv://...
   BOT_TOKEN=...
   BOT_USERNAME=...
   WEBAPP_URL=https://habitflow-xxxx.vercel.app
   ```
6. Deploy!

**Backend URL:**
```
https://habitflow-production.up.railway.app
```

---

## 6️⃣ URL'ni Ulash

### Backend → Frontend
Vercel → Project → Settings → Environment Variables
```
VITE_API_URL=https://habitflow-production.up.railway.app
```
Redeploy qiling!

### Frontend → Backend
Railway → Variables
```
WEBAPP_URL=https://habitflow-xxxx.vercel.app
```

---

## 7️⃣ Telegram Mini App

### Mini App yarating:
1. @BotFather ga o'ting
2. `/newapp` komandasini yuboring
3. Botingizni tanlang
4. Title: "HabitFlow"
5. Description: "Ezgu odatlarni shakllantiring"
6. Mini App URL: `https://habitflow-xxxx.vercel.app`
7. Short name: `habitflow`

### Testlash:
1. Bot'ga o'ting
2. `/start` yuboring
3. "Open" tugmasini bosing
4. Mini App ochiladi!

---

## ✅ Tugadi!

Mini App ishga tushdi!

- Frontend: https://habitflow-xxxx.vercel.app
- Backend: https://habitflow-production.up.railway.app
- Bot: @habitflow_bot

---

## 📝 Tips

- .env fayllarini GitHub'ga yuklamang!
- MongoDB password kuchli qiling
- Bot token secret saqlang
- Heroku/Render ham alternativlar

