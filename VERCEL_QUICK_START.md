# Vercel Quick Start - 3 Steps! 🚀

## ✅ It's Already Set Up!

The backup system is ready for Vercel. Here's what to do:

### Step 1: Deploy to Vercel

**Option A: Via Vercel Dashboard (Easiest)**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository (or upload the folder)
4. Click "Deploy"

**Option B: Via CLI**
```bash
npm install -g vercel
vercel
```

### Step 2: Get Your Vercel URL

After deployment, Vercel will give you a URL like:
```
https://your-project.vercel.app
```

### Step 3: Update index.html

Open `index.html` and find this line (around line 1464):

```javascript
const BACKUP_ENDPOINT = ""; // Set your backup server endpoint here
```

Change it to:
```javascript
const BACKUP_ENDPOINT = "https://your-project.vercel.app/api/backup-survey";
```

Replace `your-project` with your actual Vercel project name.

## ✅ That's It!

Now when someone submits the form:
1. ✅ Email sent via FormSubmit.co (to 3 recipients)
2. ✅ Backup logged to Vercel function logs
3. ✅ Both happen automatically!

## 📍 Where to See Backups

1. Go to your Vercel Dashboard
2. Select your project
3. Click "Functions" tab
4. Click on any `/api/backup-survey` execution
5. View the logs - you'll see all submissions there!

## 🔄 Want Persistent Storage?

For permanent storage (not just logs), set up Vercel KV:

1. **Vercel Dashboard** → Your Project → **Storage** → **Create Database** → **KV**
2. **Install:** `npm install @vercel/kv`
3. **Update:** Uncomment the KV code in `api/backup-survey.js`
4. **Redeploy**

See `VERCEL_SETUP.md` for detailed instructions.

## 🧪 Test It

After deployment, test your endpoint:

```bash
curl -X POST https://your-project.vercel.app/api/backup-survey \
  -H "Content-Type: application/json" \
  -d '{"submitted_at":"2025-01-15T10:00:00.000Z","test":true}'
```

Or visit: `https://your-project.vercel.app/api/health`

## 📁 Files Created for Vercel

- ✅ `api/backup-survey.js` - Backup endpoint (serverless function)
- ✅ `api/health.js` - Health check endpoint
- ✅ `vercel.json` - Vercel configuration

Everything is ready! Just deploy and update the URL. 🎉

