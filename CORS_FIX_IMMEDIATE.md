# 🚨 CORS FIX - IMMEDIATE ACTION REQUIRED

## The Problem
- Frontend (Vercel: `zynetro-application-frontend-9ren-qtadat834.vercel.app`) 
- Cannot call Backend (Render: `zynetro-application-3.onrender.com`)
- Error: `CORS policy blocked - no Access-Control-Allow-Origin header`

## The Fix (Do These 2 Things)

### ✅ STEP 1: Update Render Backend (5 min)
**Go to:** [Render Dashboard](https://dashboard.render.com) → Select Backend Service

**Then:**
1. Click **Environment** tab
2. Find variable: `FRONTEND_ORIGIN`
3. Change the value to:
```
http://localhost:3000,http://localhost:3001,https://zynetro-application-frontend-nrqy.vercel.app,https://zynetro-application-frontend-9ren-qtadat834.vercel.app
```
4. Click **Save**
5. Wait for service to redeploy (green checkmark)

### ✅ STEP 2: Verify Vercel Frontend (5 min)
**Go to:** [Vercel Dashboard](https://vercel.com) → Select Frontend Project → Settings

**Then:**
1. Click **Environment Variables**
2. Add/verify variable: `NEXT_PUBLIC_API_BASE_URL`
3. Value must be:
```
https://zynetro-application-3.onrender.com
```
4. Ensure it's checked for: **Production**, **Preview**, **Development**
5. If you just added/changed it, redeploy frontend:
   - Go to **Deployments** tab
   - Click **Redeploy** on the latest build

### ✅ STEP 3: Test (2 min)
Open browser console and paste:
```javascript
fetch('https://zynetro-application-3.onrender.com/api/v1/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test',
    email: 'test@example.com',
    company: 'Test Co',
    serviceId: 'web-dev',
    projectBrief: 'This is a valid project brief with more than twenty chars.',
    budgetRange: 'under-50k'
  })
})
.then(r => r.json())
.then(d => console.log('✅ SUCCESS:', d))
.catch(e => console.error('❌ ERROR:', e.message))
```

**Expected output:** `✅ SUCCESS: { success: true, message: "Lead registered successfully", leadId: "..." }`

## What Changed?

| File | Change | Impact |
|------|--------|--------|
| [apps/backend/.env](apps/backend/.env) | Added new Vercel URL to FRONTEND_ORIGIN | ✅ Fixes CORS on Render |
| [apps/backend/.env.example](apps/backend/.env.example) | Added production CORS docs | 📚 Future-proofs deployments |
| [apps/frontend/.env.example](apps/frontend/.env.example) | Added Vercel env var docs | 📚 Clarifies env variable usage |
| [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) | New runbook | 📚 Prevents regression |

## Why This Happened

1. ❌ **Render config was outdated:** Only allowed old Vercel domain (`nrqy`), not new one (`qtadat834`)
2. ❌ **Vercel env var not set:** Frontend `.env.local` works locally but Vercel ignores `.env` files during CI/CD deployment
3. ❌ **No clear docs:** Made it hard to know which env vars go where

## Status

- **Backend fix:** ✅ Applied (.env updated with new Vercel URL)
- **Frontend fix:** ⚠️ **Manual action needed** (Set `NEXT_PUBLIC_API_BASE_URL` in Vercel dashboard)
- **Documentation:** ✅ Complete (See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md))

## Next Steps After Vercel Redeploy

1. **Wait 2-3 minutes** for Vercel deployment to complete
2. **Visit frontend URL:** https://zynetro-application-frontend-9ren-qtadat834.vercel.app
3. **Try submitting a lead form** → Should work without CORS errors
4. **Check Network tab** in DevTools → POST request to `https://zynetro-application-3.onrender.com/api/v1/leads` should return 200

---

**Questions?** See full docs: [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
