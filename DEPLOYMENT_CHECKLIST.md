# Zynetra Deployment Checklist

## CORS & Environment Variable Configuration

This document prevents production CORS errors when deploying frontend and backend to different hosts.

---

## Problem Summary

Frontend deployed on **Vercel** cannot call backend on **Render** due to:
1. CORS misalignment: Backend doesn't allow the frontend's origin
2. URL mismatch: Frontend calls wrong API base URL
3. Environment variables not set in deployment platforms

---

## Production Deployment Checklist

### Step 1: Backend (Render) - Set CORS for New Frontend URL

**When:** Every time you deploy frontend to a new Vercel URL
**Where:** [Render Dashboard](https://dashboard.render.com) → Your Service → Environment

1. Navigate to your Zynetra backend service on Render
2. Go to **Environment** section
3. Find or create the `FRONTEND_ORIGIN` variable
4. **Add the new frontend URL** to the comma-separated list (no spaces):

**Current production value (as of 2026-05-05):**
```
http://localhost:3000,http://localhost:3001,https://zynetro-application-frontend-nrqy.vercel.app,https://zynetro-application-frontend-9ren-qtadat834.vercel.app
```

**Format:** `url1,url2,url3` (spaces around commas will cause issues)

**Key URLs to always keep:**
- `http://localhost:3000` - Local development
- `http://localhost:3001` - Vercel preview port alternative
- Previous production Vercel URLs - for backward compatibility
- **New frontend URL** - Add current Vercel deployment URL here

---

### Step 2: Frontend (Vercel) - Set API Base URL

**When:** Every time you deploy frontend
**Where:** [Vercel Dashboard](https://vercel.com) → Project Settings → Environment Variables

1. Navigate to your Zynetra frontend project on Vercel
2. Go to **Settings** → **Environment Variables**
3. Create/update the `NEXT_PUBLIC_API_BASE_URL` variable:
   - **Value:** `https://zynetro-application-3.onrender.com` (or current Render backend URL)
   - **Environments:** Check **Production**, **Preview**, **Development**

⚠️ **CRITICAL:** Vercel does NOT use `.env.local` or `.env` files during CI/CD deployment. You MUST set this in the Vercel dashboard.

---

### Step 3: Local Development Testing

Before committing, verify both environments work:

**Terminal 1 - Start backend (local):**
```bash
cd apps/backend
npm start
```

**Terminal 2 - Start frontend (local):**
```bash
cd apps/frontend
npm run dev
```

**Test:**
1. Open http://localhost:3000
2. Submit a lead form or make an API call
3. Check browser console for CORS errors
4. Verify no network errors in DevTools

---

### Step 4: Test Production URLs

After deploying both to production:

**PowerShell test (from repo root):**
```powershell
$body = @{
  name = 'Test User'
  email = 'test@production.com'
  company = 'Test Co'
  serviceId = 'web-dev'
  projectBrief = 'This is a valid project brief with more than twenty chars.'
  budgetRange = 'under-50k'
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri 'https://zynetro-application-3.onrender.com/api/v1/leads' `
  -Method Post `
  -ContentType 'application/json' `
  -Body $body | ConvertTo-Json -Depth 6
```

Expected response: `{ success: true, message: "Lead registered successfully", leadId: "..." }`

**Frontend test:**
1. Visit your Vercel frontend URL
2. Go to Contact/Lead form page
3. Submit the form
4. Monitor:
   - Network tab in DevTools (should see POST to backend URL, no CORS errors)
   - Console for any errors
   - Confirmation message on page

---

## Environment Variables Reference

### Backend (.env on Render)

| Variable | Purpose | Example |
|----------|---------|---------|
| `PORT` | Express server port | `4000` |
| `FRONTEND_ORIGIN` | **CORS whitelist** (comma-separated URLs) | `http://localhost:3000,https://zynetro-app.vercel.app` |
| `FRONTEND_ORIGIN_PATTERNS` | Regex patterns for preview deployments | `https://zynetro-app-*.vercel.app` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | JWT signing secret | `[strong-random-value]` |
| `GMAIL_USER` | Send-from Gmail address | `your-email@gmail.com` |
| `GMAIL_APP_PASSWORD` | Gmail app-specific password | `[16-char-app-password]` |
| `LEAD_NOTIFICATION_TO` | Email for lead notifications | `notify@company.com` |

### Frontend (.env on Vercel)

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL **exposed to browser** | `https://zynetro-application-3.onrender.com` |

---

## Troubleshooting CORS Errors

**Error:** `Access to XMLHttpRequest at 'https://backend.onrender.com' from origin 'https://frontend.vercel.app' has been blocked by CORS policy`

**Fixes (in priority order):**
1. ✅ Backend `FRONTEND_ORIGIN` includes frontend URL? (Check Render environment)
2. ✅ Frontend `NEXT_PUBLIC_API_BASE_URL` is set in Vercel? (NOT in .env file)
3. ✅ Frontend is calling the backend URL correctly? (Check DevTools Network tab)
4. ✅ Backend is running? (Visit `https://backend.onrender.com/health` - if this returns 404, backend is running)
5. ✅ Trailing slashes? (Backend strips them, but ensure consistency)

**Debug steps:**
```bash
# 1. Check what URL frontend is calling
# (Look at Network tab in DevTools, filter by XHR/Fetch)

# 2. Verify backend CORS is configured
curl -i -X OPTIONS https://zynetro-application-3.onrender.com/api/v1/leads \
  -H "Origin: https://your-vercel-app.vercel.app" \
  -H "Access-Control-Request-Method: POST"

# Should see: Access-Control-Allow-Origin header in response
```

---

## Deployment Flow (Summary)

1. **Develop locally** with `.env.local` set to `http://localhost:4000`
2. **Commit code** (never commit `.env` or `.env.local`)
3. **Deploy backend** to Render (CI/CD from GitHub)
4. **Deploy frontend** to Vercel (CI/CD from GitHub)
5. **Update Render env** → Add new Vercel URL to `FRONTEND_ORIGIN`
6. **Update Vercel env** → Verify `NEXT_PUBLIC_API_BASE_URL` is set
7. **Test production URLs** using manual test or form submission
8. **Monitor logs** for CORS or API errors

---

## Files to Keep Updated

- [apps/backend/.env.example](apps/backend/.env.example) - Template for production backend config
- [apps/frontend/.env.example](apps/frontend/.env.example) - Template for production frontend config
- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - This file (update when adding new URLs or env vars)

---

## Quick Reference: Current Production URLs

**As of 2026-05-05:**

| Service | Environment | URL |
|---------|------------|-----|
| Frontend | Production | https://zynetro-application-frontend-9ren-qtadat834.vercel.app |
| Frontend | Preview (old) | https://zynetro-application-frontend-nrqy.vercel.app |
| Backend | Production | https://zynetro-application-3.onrender.com |

---

## Questions?

**CORS still broken?**
- Verify `FRONTEND_ORIGIN` on Render includes your Vercel URL exactly (no typos)
- Restart backend service on Render after changing env vars
- Clear browser cache and hard reload (Cmd+Shift+R or Ctrl+Shift+R)

**Frontend calling wrong URL?**
- Check `NEXT_PUBLIC_API_BASE_URL` in Vercel dashboard, not in `.env.local`
- Redeploy frontend after changing environment variable
- Verify variable is set for **Production** environment in Vercel

**Local dev not working?**
- Use `.env.local` (not committed) with `NEXT_PUBLIC_API_BASE_URL=http://localhost:4000`
- Backend `.env.local` or `.env` should have `FRONTEND_ORIGIN` including `http://localhost:3000`
- Restart both services after changing `.env` files
