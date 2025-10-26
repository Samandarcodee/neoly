# Railway Error Fix

## Xatolik: "You must specify a workspaceId to create a project"

Bu xatolik Railway'da workspace yaratmaganligingizni bildiradi.

### ✅ Yechim:

#### 1. Workspace Yaratish:
1. Railway Dashboard'ga kiring: https://railway.app
2. Sol tarafdagi menudan **"New Workspace"** yoki **"Create Workspace"** tugmasini bosing
3. Workspace nomi: "My Projects" (yoki istalgan)
4. Click **"Create"**

#### 2. Keyin Project Yaratish:
1. Yaratilgan workspace ichida **"New Project"** tugmasini bosing
2. **"Deploy from GitHub repo"** ni tanlang
3. `neoly` repository ni tanlang
4. **Settings:**
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Environment Variables** qo'shing:
   ```
   MONGODB_URI=...
   BOT_TOKEN=...
   BOT_USERNAME=...
   WEBAPP_URL=...
   ```
6. **Deploy!** tugmasini bosing

---

## Alternativ: Railway CLI

Agar sahifada muammo bo'lsa, CLI orqali:

```powershell
npm install -g @railway/cli
railway login
railway init
railway up
```

---

## Yoki Render.com ishlating

Railway ishlamasa:
1. https://render.com ga kiring
2. "New Web Service"
3. GitHub repo tanlang
4. Root Directory: `backend`
5. Environment variables qo'shing
6. Deploy!

