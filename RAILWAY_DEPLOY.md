# 🚀 Railway'ga PostgreSQL bilan Deploy Qilish

## Step 1: Railway'ga PostgreSQL Database Qo'shish

1. **Hisob yarating:** https://railway.app ga kiring
2. **New Project yarating:**
   - "Start a New Project" tugmasini bosing
   - GitHub bilan ulaning

3. **PostgreSQL Service qo'shing:**
   - "New" → "Database" → "Add PostgreSQL"
   - Railway avtomatik PostgreSQL database yaratadi
   - Database connection string avtomatik `DATABASE_URL` environment variable sifatida qo'shiladi

4. **Connection String ni oling:**
   - PostgreSQL service ni oching
   - "Variables" tab → `DATABASE_URL` ni ko'rasiz
   - Yoki "Connect" tab → "Postgres Connection URL" ni ko'rasiz

---

## Step 2: Telegram Bot (Optional)

1. **@BotFather ni oching** (Telegram'da)
2. `/newbot` yuboring
3. Bot name: HabitFlow Bot
4. Username: habitflow_bot
5. **Token ni saqlang:**
   ```
   1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
   ```

---

## Step 3: Backend'ni Railway'ga Deploy Qilish

### 3.1 Backend Service Qo'shish
1. Railway Dashboard'da "New" → "GitHub Repo" ni tanlang
2. `neoly` repository ni tanlang
3. **Service Settings:**
   - Name: habitflow-backend
   - Root Directory: `backend` (agar kerak bo'lsa)

### 3.2 PostgreSQL Database'ni Backend'ga Link Qilish
1. Backend service ni oching
2. "Variables" tab ga o'ting
3. "Add Reference" tugmasini bosing
4. PostgreSQL service ni tanlang
5. `DATABASE_URL` variable ni tanlang
6. Railway avtomatik database ni backend'ga ulaydi

### 3.3 Environment Variables Qo'shish
Backend service → Variables → Add:

```
PORT=3000
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
BOT_USERNAME=habitflow_bot
WEBAPP_URL=https://your-frontend-url.vercel.app
```

**Eslatma:** `DATABASE_URL` PostgreSQL service bilan avtomatik link qilingan bo'lishi kerak!

### 3.4 Build va Deploy Settings
Railway.json yoki Railway Dashboard'da:
- **Build Command:** `npm install` (yoki Railway avtomatik aniqlaydi)
- **Start Command:** `npm start`
- **Dockerfile:** `backend/Dockerfile` (agar mavjud bo'lsa)

### 3.5 Deploy!
- Railway automatic build qiladi
- **Backend URL olinadi:**
  ```
  https://habitflow-backend-production.up.railway.app
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
VITE_API_URL=https://habitflow-backend-production.up.railway.app
```

### 4.4 Deploy!
- Frontend URL olinadi:
  ```
  https://habitflow.vercel.app
  ```

---

## Step 5: URL'larni Ulash

### Railway Backend'ga Frontend URL qo'shing:
Backend service → Variables → Add/Update:
```
WEBAPP_URL=https://habitflow.vercel.app
```

### Vercel Frontend'ga Backend URL yangilash:
Frontend → Settings → Environment Variables:
```
VITE_API_URL=https://habitflow-backend-production.up.railway.app
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

1. Railway'da backend logs ni tekshiring - PostgreSQL ulanayotganini ko'rasiz:
   ```
   ✅ PostgreSQL connection established successfully
   ✅ PostgreSQL models synchronized
   ```

2. Telegram'da bot'ni oching
3. `/start` yuboring
4. **"Open HabitFlow"** tugmasini bosing
5. Mini App ochiladi! 🚀

---

## ✅ Tugadi!

**Production Endpoints:**
- 🌐 Frontend: https://habitflow.vercel.app
- 🔧 Backend: https://habitflow-backend-production.up.railway.app
- 🤖 Bot: @habitflow_bot
- 📊 Database: PostgreSQL (Railway)

**Features ishlaydi:**
- ✅ Habit yaratish
- ✅ Daily check-in
- ✅ Progress tracking
- ✅ Circular charts
- ✅ Daily reminders (9 AM UTC)
- ✅ O'zbek tili
- ✅ PostgreSQL database

---

## 🆘 Troubleshooting

### PostgreSQL ulanmaydi:
- Railway Dashboard → Backend service → Variables → `DATABASE_URL` mavjudligini tekshiring
- PostgreSQL service Link qilinganini tekshiring
- Railway logs ga qarang: `DATABASE_URL` environment variable mavjudligini tekshiring

### Backend xatosi:
- Environment variables to'g'ri kiritilganini tekshiring
- Railway logs ga qarang (Dashboard → Logs)
- PostgreSQL service ishlamoqda ekanligini tekshiring

### Database connection error:
- Railway PostgreSQL service → Variables → Connection URL ni ko'ring
- SSL connection kerak bo'lsa, `DATABASE_SSL=true` qo'shing
- Railway'da PostgreSQL avtomatik SSL bilan ishlaydi

---

## 💡 Tips

- Railway free tier - $5 credit beradi
- PostgreSQL Railway'da bepul (free tier)
- Vercel free tier cheksiz
- Telegram bot bepul

**Hammasi bepul ishlaydi!** 🎉

---

## PostgreSQL Database Structure

Database avtomatik yaratiladi. `habits` jadvali avtomatik yaratiladi:

```sql
CREATE TABLE habits (
  id SERIAL PRIMARY KEY,
  userId VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  duration INTEGER NOT NULL,
  currentDay INTEGER DEFAULT 0,
  startDate TIMESTAMP DEFAULT NOW(),
  completed BOOLEAN DEFAULT false,
  lastCheckIn TIMESTAMP,
  checkInHistory JSONB DEFAULT '[]',
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

Index: `userId` ga index qo'shilgan.
