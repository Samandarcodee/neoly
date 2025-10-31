# PostgreSQL Setup Guide

## Local Development (Windows)

### Option 1: Docker (Recommended) 🐳

```powershell
docker run --name postgres-habitflow -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=habitflow -p 5432:5432 -d postgres:15
```

`.env` faylida:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/habitflow
DATABASE_SSL=false
```

### Option 2: PostgreSQL Install Qilish

1. **PostgreSQL yuklab oling:**
   - https://www.postgresql.org/download/windows/
   - PostgreSQL installer ni yuklab oling va o'rnating

2. **PostgreSQL ni start qiling:**
   - Windows Services → PostgreSQL service ni start qiling
   - Yoki command prompt'da:
     ```powershell
     pg_ctl -D "C:\Program Files\PostgreSQL\15\data" start
     ```

3. **Database yarating:**
   ```powershell
   psql -U postgres
   ```
   ```sql
   CREATE DATABASE habitflow;
   \q
   ```

4. **`.env` faylida:**
   ```env
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/habitflow
   DATABASE_SSL=false
   ```

### Option 3: Railway PostgreSQL (Cloud)

1. Railway'da PostgreSQL service yarating
2. `DATABASE_URL` ni oling
3. `.env` faylida:
   ```env
   DATABASE_URL=postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway
   DATABASE_SSL=true
   ```

---

## Connection String Format

```
postgresql://username:password@host:port/database
```

### Local:
```
postgresql://postgres:postgres@localhost:5432/habitflow
```

### Railway:
```
postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway
```

---

## Testing Connection

Backend'ni ishga tushiring:
```powershell
cd backend
npm install
npm run dev
```

Xabarlarni ko'rasiz:
```
✅ PostgreSQL connection established successfully
✅ PostgreSQL models synchronized
🚀 Server running on port 3000
```

---

## Troubleshooting

### Connection refused:
- PostgreSQL service ishlamoqda ekanligini tekshiring
- Port 5432 bloklanmaganini tekshiring

### Authentication failed:
- Username va password to'g'riligini tekshiring
- PostgreSQL pg_hba.conf faylini tekshiring

### SSL required:
- Railway'da: `DATABASE_SSL=true` qo'shing
- Local'da: `DATABASE_SSL=false` qo'shing

---

## Database Schema

Jadval avtomatik yaratiladi kodda. Manual yaratish kerak bo'lsa:

```sql
CREATE TABLE IF NOT EXISTS habits (
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

CREATE INDEX IF NOT EXISTS habits_userId_idx ON habits("userId");
```

