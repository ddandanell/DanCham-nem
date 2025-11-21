# Vercel Setup Guide - Backup System

## 🚀 Quick Setup for Vercel

Vercel uses serverless functions, so the setup is slightly different. Here's how to get it working:

### Step 1: Update package.json

Make sure your `package.json` includes Vercel dependencies:

```json
{
  "dependencies": {
    "@vercel/kv": "^0.2.0"
  }
}
```

**Note:** You can skip this if you just want logging (see Step 2).

### Step 2: Choose Your Storage Option

#### Option A: Simple Logging (Easiest - No Setup)
- ✅ Already works out of the box
- ✅ Submissions logged to Vercel function logs
- ❌ Not persistent (logs expire)
- **Use this for testing**

#### Option B: Vercel KV (Recommended - Persistent)
1. Go to your Vercel dashboard
2. Navigate to your project → Storage → Create Database
3. Select "KV" (Key-Value store)
4. Create the database
5. Uncomment the KV code in `api/backup-survey.js`
6. Install: `npm install @vercel/kv`

#### Option C: External Database (Most Flexible)
- Use MongoDB, Supabase, Airtable, etc.
- Modify `api/backup-survey.js` to save to your database

### Step 3: Update index.html

Find the `BACKUP_ENDPOINT` constant (around line 1464) and set it to your Vercel URL:

```javascript
const BACKUP_ENDPOINT = "https://your-project.vercel.app/api/backup-survey";
```

Replace `your-project` with your actual Vercel project name.

### Step 4: Deploy to Vercel

**Via Vercel CLI:**
```bash
npm install -g vercel
vercel
```

**Via GitHub:**
1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Vercel will auto-deploy

**Via Vercel Dashboard:**
1. Go to vercel.com
2. Click "New Project"
3. Import your repository
4. Deploy

## 📁 File Structure for Vercel

```
DanCham-nem/
├── index.html              # Your survey form
├── api/                    # Vercel serverless functions
│   ├── backup-survey.js    # Backup endpoint
│   └── health.js           # Health check
├── vercel.json             # Vercel configuration
└── package.json            # Dependencies
```

## ✅ How It Works

1. **Form submits** → Sends to FormSubmit.co (emails)
2. **Form submits** → Sends to `/api/backup-survey` (Vercel function)
3. **Vercel function** → Logs or saves to KV/database
4. **Done!** ✅

## 🔍 Viewing Backups

### If Using Logging:
1. Go to Vercel Dashboard
2. Select your project
3. Go to "Functions" tab
4. Click on a function execution
5. View logs

### If Using Vercel KV:
1. Go to Vercel Dashboard
2. Select your project
3. Go to "Storage" → Your KV database
4. View stored submissions

## 🎯 Recommended: Vercel KV Setup

Vercel KV is the easiest persistent storage option:

1. **Create KV Database:**
   - Vercel Dashboard → Your Project → Storage → Create Database → KV

2. **Update the API file:**
   - Open `api/backup-survey.js`
   - Uncomment the KV code (lines with `import { kv }`)
   - Comment out the simple logging code

3. **Install dependency:**
   ```bash
   npm install @vercel/kv
   ```

4. **Deploy:**
   ```bash
   vercel --prod
   ```

## 🔧 Testing

After deployment, test your endpoint:

```bash
curl -X POST https://your-project.vercel.app/api/backup-survey \
  -H "Content-Type: application/json" \
  -d '{"submitted_at":"2025-01-15T10:00:00.000Z","test":true}'
```

Or use the test script (update the URL first):
```bash
node test-backup.js https://your-project.vercel.app/api/backup-survey
```

## 📝 Important Notes

- **No file system writes:** Vercel functions can't write to the file system (except /tmp, which isn't persistent)
- **Use KV or external DB:** For persistent storage, use Vercel KV or an external database
- **Function logs:** Even with logging, you can see submissions in Vercel's function logs
- **Auto-scaling:** Vercel automatically scales your functions

## 🆘 Troubleshooting

**Function not found?**
- Make sure `api/backup-survey.js` exists
- Check `vercel.json` routes are correct
- Redeploy: `vercel --prod`

**CORS errors?**
- Vercel functions handle CORS automatically
- If issues, add CORS headers in the function

**KV not working?**
- Make sure KV database is created in Vercel dashboard
- Check environment variables are set
- Verify `@vercel/kv` is installed

## 🎉 That's It!

Your backup system will automatically work on Vercel once deployed. Just:
1. Deploy to Vercel
2. Update `BACKUP_ENDPOINT` in `index.html` to your Vercel URL
3. Test it!

For persistent storage, set up Vercel KV (takes 2 minutes in the dashboard).

