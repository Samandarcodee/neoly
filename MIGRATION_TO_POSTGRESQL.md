# PostgreSQL ga O'tkazish - Migration Guide

## ✅ O'zgarishlar

Ma'lumotlar bazasi **to'liq PostgreSQL ga o'tkazildi**. Quyidagi o'zgarishlar qilindi:

### 1. Dependencies
- ✅ `mongoose` o'rniga `sequelize` va `pg` qo'shildi
- ✅ `better-sqlite3` olib tashlandi (SQLite endi qo'llab-quvvatlanmaydi)

### 2. Database Configuration
- ✅ `backend/config/postgresql.js` - PostgreSQL connection konfiguratsiyasi
- ✅ SSL support (Railway va cloud providerlar uchun)
- ✅ Connection pooling optimizatsiya qilindi

### 3. Models
- ✅ `backend/models/Habit.js` - Sequelize ORM bilan yozildi
- ✅ PostgreSQL JSONB support (checkInHistory uchun)
- ✅ Avtomatik timestamps

### 4. Routes
- ✅ `backend/routes/habits.js` - PostgreSQL Sequelize queries ga o'tkazildi
- ✅ Barcha CRUD operatsiyalar PostgreSQL uchun ishlaydi

### 5. Server
- ✅ `backend/server.js` - faqat PostgreSQL ga ulaydi
- ✅ MongoDB va SQLite kodlari olib tashlandi

### 6. Cron Jobs
- ✅ `backend/config/cron.js` - PostgreSQL Sequelize queries ga moslashtirildi

### 7. Environment Variables
- ✅ `DATABASE_URL` yoki `POSTGRES_URL` kerak
- ✅ `DATABASE_SSL` (optional, avtomatik aniqlanadi)

---

## 🚀 Railway Deployment

Railway'ga deploy qilish uchun:

1. **PostgreSQL Service qo'shing:**
   - Railway Dashboard → New → Database → PostgreSQL
   - Database avtomatik `DATABASE_URL` ni beradi

2. **Backend Service:**
   - GitHub repo dan deploy qiling
   - PostgreSQL service ni backend'ga link qiling
   - `DATABASE_URL` avtomatik qo'shiladi

3. **Environment Variables:**
   ```
   PORT=3000
   TELEGRAM_BOT_TOKEN=your_token
   WEBAPP_URL=your_frontend_url
   ```

Batafsil: `RAILWAY_DEPLOY.md` fayliga qarang.

---

## 📝 Local Development

### Docker bilan (Recommended):
```powershell
docker run --name postgres-habitflow -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=habitflow -p 5432:5432 -d postgres:15
```

### `.env` faylida:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/habitflow
DATABASE_SSL=false
PORT=3000
```

### Dependencies o'rnatish:
```powershell
cd backend
npm install
npm run dev
```

Batafsil: `POSTGRESQL_SETUP.md` fayliga qarang.

---

## 📊 Database Schema

Jadval avtomatik yaratiladi. Struktura:

```sql
CREATE TABLE habits (
  id SERIAL PRIMARY KEY,
  "userId" VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  duration INTEGER NOT NULL,
  "currentDay" INTEGER DEFAULT 0,
  "startDate" TIMESTAMP DEFAULT NOW(),
  completed BOOLEAN DEFAULT false,
  "lastCheckIn" TIMESTAMP,
  "checkInHistory" JSONB DEFAULT '[]',
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);
```

Index: `userId` ga index qo'shilgan.

---

## ⚠️ Eslatmalar

1. **MongoDB va SQLite endi qo'llab-quvvatlanmaydi**
2. **Old database'dan ma'lumotlarni migrate qilish kerak bo'lsa**, manual migration script yozishingiz kerak
3. **Railway'da SSL avtomatik yoqiladi** (production environment)
4. **Local development'da SSL kerak emas**

---

## 🔄 Migration Checklist

- [x] PostgreSQL dependencies qo'shildi
- [x] PostgreSQL konfiguratsiyasi yaratildi
- [x] Habit model PostgreSQL ga o'tkazildi
- [x] Routes PostgreSQL ga o'tkazildi
- [x] Cron jobs PostgreSQL ga o'tkazildi
- [x] Server.js PostgreSQL ga o'zgartirildi
- [x] Environment variables yangilandi
- [x] Railway deployment qo'llanmasi yangilandi
- [x] Local setup qo'llanmasi yaratildi

---

## ✅ Tugadi!

Endi proyekt **to'liq PostgreSQL** ishlatadi va **Railway'ga deploy** qilishga tayyor!

