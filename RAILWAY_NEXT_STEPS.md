# 🚀 Railway'da Keyingi Qadamlar

## ✅ Hozirgi Holat:
- ✅ PostgreSQL database deploy qilingan
- ✅ Backend service (neoly) deploy qilingan

## 📋 Keyingi Qadamlar:

### 1️⃣ PostgreSQL'ni Backend'ga Link Qilish

1. Railway Dashboard'da **"neoly"** service'ni oching
2. **"Variables"** tab ga o'ting
3. **"Add Reference"** tugmasini bosing
4. **"Postgres"** service'ni tanlang
5. **`DATABASE_URL`** variable'ni tanlang
6. Saqlang

Bu qildan keyin `DATABASE_URL` avtomatik backend service'ga qo'shiladi.

---

### 2️⃣ Environment Variables Qo'shish

Backend service → Variables → Add:

#### Majburiy:
```env
PORT=3000
```

#### Telegram Bot uchun (Optional):
```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
BOT_TOKEN=your_telegram_bot_token
BOT_USERNAME=your_bot_username
WEBAPP_URL=https://your-frontend-url.vercel.app
```

**Eslatma:** `DATABASE_URL` avtomatik qo'shiladi (link qilgandan keyin).

---

### 3️⃣ Backend'ni Redeploy Qilish

Variables qo'shgandan keyin:
1. Backend service → **"Deployments"** tab
2. **"Redeploy"** tugmasini bosing
3. Yoki **"Settings"** → **"Deploy"** → **"Redeploy"**

---

### 4️⃣ Test Qilish

Deploy qilingandan keyin:

1. **Logs ni tekshiring:**
   - Backend service → **"Deployments"** → **"View logs"**
   - Quyidagi xabarlarni ko'rishingiz kerak:
     ```
     ✅ PostgreSQL connection established successfully
     ✅ PostgreSQL models synchronized
     🚀 Server running on port 3000
     ```

2. **Health Check:**
   - Backend service → **"Networking"** tab
   - URL ni oling: `https://neoly-production.up.railway.app`
   - Browser'da oching: `https://neoly-production.up.railway.app/health`
   - Response: `{"status":"ok","message":"HabitFlow Backend is running"}`

3. **Database'ni tekshiring:**
   - PostgreSQL service → **"Database"** tab → **"Data"**
   - `habits` jadvali avtomatik yaratilishi kerak

---

### 5️⃣ API Test Qilish

Postman yoki curl bilan:

```bash
# Health check
curl https://neoly-production.up.railway.app/health

# Habit yaratish
curl -X POST https://neoly-production.up.railway.app/api/habits \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test_user_123",
    "title": "Test Habit",
    "duration": 30
  }'

# Habitlarni olish
curl https://neoly-production.up.railway.app/api/habits/test_user_123
```

---

## 🆘 Muammolar bo'lsa:

### PostgreSQL ulanmayapti:
- ✅ PostgreSQL service → Variables → `DATABASE_URL` mavjudligini tekshiring
- ✅ Backend service → Variables → `DATABASE_URL` reference mavjudligini tekshiring
- ✅ Logs'da xato xabarlarni ko'ring

### Build xatosi:
- ✅ `backend/package.json` da `pg` va `sequelize` mavjudligini tekshiring
- ✅ Logs'da npm install xatolarini ko'ring

### Database jadval yaratilmayapti:
- ✅ Logs'da "PostgreSQL models synchronized" xabarini ko'ring
- ✅ PostgreSQL service → Database → Data tab'da jadvalni ko'ring

---

## ✅ Keyingi Qadam:

Backend ishlagandan keyin:
1. Frontend'ni deploy qiling (Vercel)
2. Frontend URL'ni backend'ga qo'shing (`WEBAPP_URL`)
3. Telegram Mini App sozlang

