# DanCham Survey Backup Server Setup

This backup server automatically saves all form submissions to a JSON file, providing a reliable backup in case email delivery fails.

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
npm start
```

The server will run on port 3000 by default (or the port specified in the `PORT` environment variable).

### 3. Update the HTML File

Open `index.html` and update the `BACKUP_ENDPOINT` constant:

```javascript
const BACKUP_ENDPOINT = "https://your-server.com/api/backup-survey";
```

Replace `https://your-server.com` with your actual server URL.

### 4. Test the Setup

1. Submit a test form
2. Check the `backups/submissions.json` file - it should contain your submission

## Production Deployment

### Option 1: Using PM2 (Recommended)

PM2 is a process manager that keeps your server running and restarts it if it crashes.

```bash
# Install PM2 globally
npm install -g pm2

# Start the server with PM2
pm2 start server-backup.js --name dancham-backup

# Save PM2 configuration
pm2 save

# Set PM2 to start on system boot
pm2 startup
```

### Option 2: Using systemd (Linux)

Create a service file at `/etc/systemd/system/dancham-backup.service`:

```ini
[Unit]
Description=DanCham Survey Backup Server
After=network.target

[Service]
Type=simple
User=your-username
WorkingDirectory=/path/to/DanCham-nem
ExecStart=/usr/bin/node server-backup.js
Restart=always

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl enable dancham-backup
sudo systemctl start dancham-backup
```

### Option 3: Deploy to Cloud Services

#### Heroku
1. Create a `Procfile` with: `web: node server-backup.js`
2. Deploy: `git push heroku main`

#### Railway
1. Connect your repository
2. Set start command: `node server-backup.js`
3. Deploy automatically

#### DigitalOcean App Platform
1. Create a new app
2. Set build command: `npm install`
3. Set run command: `node server-backup.js`

## File Structure

```
backups/
  └── submissions.json    # All form submissions stored here
```

## API Endpoints

- `POST /api/backup-survey` - Receives and saves form submissions
- `GET /api/submissions` - View all saved submissions (for admin)
- `GET /health` - Health check endpoint

## Security Notes

⚠️ **Important**: The `/api/submissions` endpoint is currently open. For production:

1. Add authentication (e.g., API key or JWT)
2. Use HTTPS only
3. Consider rate limiting
4. Add IP whitelisting if needed

Example with basic API key:

```javascript
const API_KEY = process.env.API_KEY || 'your-secret-key';

app.get('/api/submissions', (req, res) => {
  if (req.headers['x-api-key'] !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // ... rest of the code
});
```

## Monitoring

Check server logs to ensure backups are being saved:
```bash
# If using PM2
pm2 logs dancham-backup

# If running directly
# Logs will appear in the console
```

## Backup File Format

Submissions are stored in `backups/submissions.json` as an array:

```json
[
  {
    "id": "submission-1234567890-abc123",
    "submitted_at": "2025-01-15T10:30:00.000Z",
    "backup_received_at": "2025-01-15T10:30:01.234Z",
    "response_language": "da",
    "contact_name": "John Doe",
    "contact_email": "john@example.com",
    "contact_whatsapp": "+62 812 3456 7890",
    "answers": {
      "overall_satisfaction": 4,
      "reason_for_joining": "Networking",
      ...
    }
  }
]
```

## Troubleshooting

### Server won't start
- Check if port 3000 is already in use
- Verify Node.js is installed: `node --version`
- Check dependencies: `npm install`

### Backups not saving
- Verify `BACKUP_ENDPOINT` in `index.html` matches your server URL
- Check server logs for errors
- Ensure the `backups` directory is writable

### Can't access submissions
- Verify the server is running
- Check the endpoint URL
- Review CORS settings if accessing from a different domain

