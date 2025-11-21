# Fix: EDGE_CONFIG Environment Variable Conflict

## 🔍 The Problem

You're getting this error:
```
This project already has an environment variable called EDGE_CONFIG in one of the chosen environments.
```

This happens because:
- You already have **Edge Config** set up (which uses `EDGE_CONFIG`)
- Vercel is checking for conflicts when creating **Vercel KV**
- **Good news:** They use different variable names, so they can coexist!

## ✅ Solution: They Can Coexist!

**Edge Config** and **Vercel KV** use **different environment variables**:

- **Edge Config** uses: `EDGE_CONFIG`
- **Vercel KV** uses: `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`

They won't conflict! Here's how to proceed:

## 🚀 Option 1: Create KV Manually (Recommended)

Instead of using the "Create Database" button, manually create KV and set environment variables:

### Step 1: Create KV Database via Vercel API or CLI

**Via Vercel Dashboard:**
1. Go to your project → **Storage**
2. Click **Create Database**
3. Select **KV**
4. If you get the error, try **Option 2** below

**Via Vercel CLI:**
```bash
vercel kv create dancham-submissions
```

This will create the KV database and automatically set the environment variables.

### Step 2: Verify Environment Variables

After creating KV, check your environment variables:
- `KV_REST_API_URL` ✅ (for KV)
- `KV_REST_API_TOKEN` ✅ (for KV)
- `EDGE_CONFIG` ✅ (for Edge Config - already exists)

They should all be there without conflicts!

## 🚀 Option 2: Use Different Environment

If the dashboard still gives errors, you can:

1. **Create KV in a different environment first:**
   - Try creating it for "Production" only
   - Or "Preview" only
   - Then copy to other environments

2. **Or manually add KV environment variables:**
   - Go to **Settings** → **Environment Variables**
   - Add these manually (you'll get them from Vercel KV dashboard):
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`
     - `KV_REST_API_READ_ONLY_TOKEN`

## 🚀 Option 3: Use Vercel CLI (Easiest)

The CLI method often bypasses the dashboard conflict:

```bash
# Install Vercel CLI if not already installed
npm install -g vercel

# Create KV database
vercel kv create dancham-submissions

# Link it to your project (if needed)
vercel link
```

This will:
- Create the KV database
- Automatically set all environment variables
- Avoid the dashboard conflict

## 🔍 Verify It Works

After creating KV, check your environment variables:

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. You should see:
   - ✅ `EDGE_CONFIG` (from Edge Config)
   - ✅ `KV_REST_API_URL` (from KV)
   - ✅ `KV_REST_API_TOKEN` (from KV)
   - ✅ `KV_REST_API_READ_ONLY_TOKEN` (from KV)

All should coexist without issues!

## 📝 Next Steps

Once KV is created:

1. **Uncomment KV code** in `api/backup-survey.js`
2. **Deploy:**
   ```bash
   vercel --prod
   ```
3. **Test** your backup endpoint

## 💡 Why This Happens

Vercel's dashboard sometimes shows a warning when it detects similar-sounding environment variables, but:
- Edge Config and KV use completely different variable names
- They're designed to work together
- The warning is just a safety check

## ✅ Quick Fix Summary

**Best approach:** Use Vercel CLI:
```bash
vercel kv create dancham-submissions
```

This bypasses the dashboard check and sets everything up automatically!

Then uncomment the KV code in `api/backup-survey.js` and deploy. 🎉

