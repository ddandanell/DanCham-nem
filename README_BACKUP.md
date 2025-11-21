# DanCham Survey - Backup System

This backup system automatically saves all form submissions to a JSON file on your server, providing a reliable backup in case email delivery fails.

## 📋 What's Included

- **server-backup.js** - The backup server that receives and saves submissions
- **package.json** - Node.js dependencies
- **setup.sh** - Quick setup script
- **test-backup.js** - Test script to verify everything works
- **QUICK_START.md** - Simple 3-step setup guide
- **BACKUP_SETUP.md** - Detailed deployment instructions

## 🚀 Quick Start

1. **Run setup:**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

2. **Start server:**
   ```bash
   npm start
   ```

3. **Update HTML:**
   - Open `index.html`
   - Find: `const BACKUP_ENDPOINT = "";`
   - Set to: `const BACKUP_ENDPOINT = "http://localhost:3000/api/backup-survey";`

4. **Test it:**
   ```bash
   node test-backup.js
   ```

That's it! Your backup system is now running.

## 📁 File Structure

```
DanCham-nem/
├── index.html              # Your survey form (already configured)
├── server-backup.js        # Backup server
├── package.json            # Dependencies
├── setup.sh                # Setup script
├── test-backup.js          # Test script
├── backups/                # Created automatically
│   └── submissions.json    # All submissions saved here
└── README_BACKUP.md        # This file
```

## 🔄 How It Works

1. User submits the survey form
2. Form sends data to:
   - **FormSubmit.co** → Sends emails to 3 recipients
   - **Your backup server** → Saves to `backups/submissions.json`
3. Both happen simultaneously (backup doesn't block email)

## 🌐 Deployment Options

### Local Development
```bash
npm start
# Server runs on http://localhost:3000
```

### Production (VPS/Server)
```bash
npm install -g pm2
pm2 start server-backup.js --name dancham-backup
pm2 save
```

### Cloud Platforms
- **Heroku**: Already has `Procfile` - just deploy
- **Railway**: Set start command: `node server-backup.js`
- **DigitalOcean**: Set run command: `node server-backup.js`

## 🔍 Viewing Submissions

**Via API:**
```
GET http://your-server.com/api/submissions
```

**Via File:**
```
backups/submissions.json
```

## ⚙️ Configuration

**Change Port:**
```bash
PORT=3001 npm start
```

**Disable Backup:**
In `index.html`, leave `BACKUP_ENDPOINT` empty:
```javascript
const BACKUP_ENDPOINT = "";
```

## 🛡️ Security Notes

The `/api/submissions` endpoint is currently open. For production:
- Add authentication (API key, JWT, etc.)
- Use HTTPS only
- Consider rate limiting
- Add IP whitelisting

See `BACKUP_SETUP.md` for security examples.

## 📞 Support

- **Quick Start**: See `QUICK_START.md`
- **Detailed Setup**: See `BACKUP_SETUP.md`
- **Testing**: Run `node test-backup.js`

