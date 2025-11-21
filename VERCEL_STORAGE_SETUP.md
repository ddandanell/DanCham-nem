# Vercel Storage Setup - Complete Guide

## 🎯 Quick Answer: Use Vercel KV (Not Edge Config)

You have **Edge Config** set up, but for form submissions, **Vercel KV is better**. Here's the complete setup:

## ✅ Step-by-Step: Vercel KV Setup

### Step 1: Create Vercel KV Database

1. Go to [vercel.com](https://vercel.com) → Your Dashboard
2. Select your project: **dan-cham-nem** (or your project name)
3. Click **Storage** tab
4. Click **Create Database**
5. Select **KV** (Key-Value store)
6. Name it: `dancham-submissions` (or any name)
7. Click **Create**

Vercel will automatically:
- Create the database
- Set up environment variables
- Make it available to your functions

### Step 2: Install Dependencies

The package is already in `package.json`. Just install:

```bash
cd "DanCham-nem"
npm install
```

Or if you need to add it manually:
```bash
npm install @vercel/kv
```

### Step 3: Update API File

Open `api/backup-survey.js` and **uncomment the KV section** (OPTION 2):

Find this section (around line 67):
```javascript
// ============================================
// OPTION 2: Vercel KV (Recommended - Best for storing submissions)
// ============================================
/*
import { kv } from '@vercel/kv';
...
*/
```

**Remove the `/*` and `*/`** to uncomment it, and **comment out OPTION 1** (the logging section).

### Step 4: Deploy

```bash
vercel --prod
```

Or push to GitHub if you have auto-deploy set up.

## ✅ That's It!

Your backup system will now:
1. ✅ Receive form submissions
2. ✅ Save to Vercel KV (persistent storage)
3. ✅ Be accessible via Vercel dashboard

## 📍 Where to See Your Submissions

1. **Vercel Dashboard** → Your Project
2. **Storage** → Your KV Database
3. View all stored submissions

Or query via API:
```javascript
import { kv } from '@vercel/kv';
const submissions = await kv.lrange('dancham-submissions', 0, -1);
```

## 🔍 Your Current Setup

You have:
- ✅ **Edge Config** - Good for config, not ideal for submissions
- ⚠️ **Need:** Vercel KV - Perfect for form submissions

## 📊 Why KV Over Edge Config?

| Your Need | Edge Config | Vercel KV |
|-----------|-------------|-----------|
| Store form submissions | ❌ Not ideal | ✅ Perfect |
| Frequent writes | ❌ Limited | ✅ Optimized |
| Simple setup | ❌ Complex | ✅ Simple |
| SDK support | ❌ Read-only | ✅ Read/Write |

## 🚀 Quick Start Commands

```bash
# 1. Install dependencies
npm install

# 2. Update api/backup-survey.js (uncomment KV section)

# 3. Deploy
vercel --prod

# 4. Update index.html with your Vercel URL
# const BACKUP_ENDPOINT = "https://your-project.vercel.app/api/backup-survey";
```

## 💡 Pro Tip

You can keep Edge Config for configuration (like feature flags, settings) and use KV for dynamic data (form submissions). They work great together!

## 🆘 Troubleshooting

**KV not working?**
- Make sure KV database is created in Vercel dashboard
- Check environment variables are set (auto-set by Vercel)
- Verify `@vercel/kv` is installed: `npm list @vercel/kv`

**Can't see submissions?**
- Check Vercel function logs for errors
- Verify the API endpoint is being called
- Check KV database in Vercel dashboard

## ✅ Summary

1. **Create KV** in Vercel dashboard (2 minutes)
2. **Uncomment KV code** in `api/backup-survey.js`
3. **Deploy** - Done!

Your form submissions will be safely stored in Vercel KV. 🎉

