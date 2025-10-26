# 🚀 Final Deploy Instructions

## Dockerfile ishlatadi (hozir to'g'ri)
Dockerfile hozir `npm install` ishlatmoqda, package-lock.json kerak emas.

## Railway Settings

### Backend Service Settings:
1. Root Directory: `backend`
2. Build Command: (Auto - Dockerfile ishlatadi)
3. Start Command: (Auto - CMD da)
4. Dockerfile Path: `backend/Dockerfile`

### Environment Variables:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/habitflow
PORT=3000
BOT_TOKEN=your_telegram_bot_token
BOT_USERNAME=your_bot_username
WEBAPP_URL=https://your-frontend.vercel.app
```

### Deploy!
Build endi ishlashi kerak.

---

## Build Process:

1. Dockerfile o'qiladi
2. `npm install` ishlaydi
3. Code copy qilinadi
4. Port 3000 expose qilinadi
5. `npm start` qilinadi

---

## Test:

Backend ishlagach:
- Railway Dashboard → Service → Networking
- URL olinadi: `https://habitflow-production.up.railway.app`
- `/health` endpoint ishlaydi

---

## Frontend Deploy (Vercel):

1. https://vercel.com
2. New Project → GitHub repo
3. Root Directory: `frontend`
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Environment Variable:
   ```
   VITE_API_URL=https://habitflow-production.up.railway.app
   ```

---

## Telegram Mini App:

1. @BotFather ga o'ting
2. `/newapp`
3. URL: Frontend URL
4. Test!

