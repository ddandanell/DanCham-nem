# Quick Start Guide - Backup Server

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies

**On Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**Or manually:**
```bash
npm install
```

### Step 2: Start the Server

```bash
npm start
```

You should see:
```
🚀 DanCham Survey Backup Server running on port 3000
📁 Backups will be saved to: /path/to/backups
🔗 Backup endpoint: http://localhost:3000/api/backup-survey
```

### Step 3: Update the HTML File

Open `index.html` and find this line (around line 1464):

```javascript
const BACKUP_ENDPOINT = ""; // Set your backup server endpoint here
```

**For local testing:**
```javascript
const BACKUP_ENDPOINT = "http://localhost:3000/api/backup-survey";
```

**For production (your actual server):**
```javascript
const BACKUP_ENDPOINT = "https://your-domain.com/api/backup-survey";
```

Replace `your-domain.com` with your actual server domain.

## ✅ Test It Works

1. **Test the server is running:**
   - Visit: `http://localhost:3000/health`
   - You should see: `{"status":"ok","timestamp":"..."}`

2. **Submit a test form:**
   - Fill out and submit the survey
   - Check the `backups/submissions.json` file
   - You should see your submission saved there

## 📁 Where Are Files Saved?

All submissions are automatically saved to:
```
backups/submissions.json
```

This file is created automatically in the same folder as `server-backup.js`.

## 🌐 Deploying to Production

### Option 1: Simple VPS/Server

1. Upload all files to your server
2. SSH into your server
3. Run: `npm install && npm start`
4. Use PM2 to keep it running:
   ```bash
   npm install -g pm2
   pm2 start server-backup.js --name dancham-backup
   pm2 save
   ```

### Option 2: Cloud Platforms

**Heroku:**
1. Create `Procfile` with: `web: node server-backup.js`
2. Deploy: `git push heroku main`

**Railway:**
1. Connect repository
2. Set start command: `node server-backup.js`
3. Deploy automatically

**DigitalOcean App Platform:**
1. Create new app
2. Set run command: `node server-backup.js`
3. Deploy

## 🔧 Troubleshooting

**Server won't start?**
- Check if port 3000 is in use: `lsof -i :3000`
- Try a different port: `PORT=3001 npm start`

**Backups not saving?**
- Check server logs for errors
- Verify `BACKUP_ENDPOINT` URL in `index.html` is correct
- Make sure server is running and accessible

**Can't access from browser?**
- Check firewall settings
- Verify CORS is enabled (it is by default)
- Check server is listening on the correct port

## 📞 Need Help?

See `BACKUP_SETUP.md` for detailed deployment instructions.

