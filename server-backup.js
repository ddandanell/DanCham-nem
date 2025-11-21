/**
 * DanCham Survey Backup Server
 * 
 * This server receives form submissions and saves them to a JSON file.
 * 
 * Setup:
 * 1. Install dependencies: npm install express cors
 * 2. Run: node server-backup.js
 * 3. Update BACKUP_ENDPOINT in index.html to point to your server URL
 * 
 * For production, use a process manager like PM2:
 * npm install -g pm2
 * pm2 start server-backup.js --name dancham-backup
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const BACKUP_DIR = path.join(__dirname, 'backups');
const BACKUP_FILE = path.join(BACKUP_DIR, 'submissions.json');

// Middleware
app.use(cors());
app.use(express.json());

// Ensure backup directory exists
async function ensureBackupDir() {
  try {
    await fs.mkdir(BACKUP_DIR, { recursive: true });
  } catch (err) {
    console.error('Error creating backup directory:', err);
  }
}

// Load existing submissions
async function loadSubmissions() {
  try {
    const data = await fs.readFile(BACKUP_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // File doesn't exist yet, return empty array
    return [];
  }
}

// Save submissions to file
async function saveSubmissions(submissions) {
  try {
    await fs.writeFile(BACKUP_FILE, JSON.stringify(submissions, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving submissions:', err);
    return false;
  }
}

// Backup endpoint
app.post('/api/backup-survey', async (req, res) => {
  try {
    const submission = req.body;
    
    // Validate submission data
    if (!submission || !submission.submitted_at) {
      return res.status(400).json({ error: 'Invalid submission data' });
    }

    // Load existing submissions
    const submissions = await loadSubmissions();
    
    // Add new submission with timestamp
    submissions.push({
      ...submission,
      backup_received_at: new Date().toISOString(),
      id: `submission-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    });

    // Save to file
    const saved = await saveSubmissions(submissions);
    
    if (saved) {
      console.log(`✓ Backup saved: ${submission.submitted_at}`);
      res.status(200).json({ 
        success: true, 
        message: 'Backup saved successfully',
        total_submissions: submissions.length
      });
    } else {
      res.status(500).json({ error: 'Failed to save backup' });
    }
  } catch (err) {
    console.error('Error processing backup:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all submissions (for admin/review - consider adding authentication)
app.get('/api/submissions', async (req, res) => {
  try {
    const submissions = await loadSubmissions();
    res.json({ 
      count: submissions.length,
      submissions: submissions
    });
  } catch (err) {
    console.error('Error loading submissions:', err);
    res.status(500).json({ error: 'Failed to load submissions' });
  }
});

// Initialize server
async function startServer() {
  await ensureBackupDir();
  
  app.listen(PORT, () => {
    console.log(`\n🚀 DanCham Survey Backup Server running on port ${PORT}`);
    console.log(`📁 Backups will be saved to: ${BACKUP_DIR}`);
    console.log(`🔗 Backup endpoint: http://localhost:${PORT}/api/backup-survey`);
    console.log(`💚 Health check: http://localhost:${PORT}/health`);
    console.log(`📊 View submissions: http://localhost:${PORT}/api/submissions\n`);
    console.log(`💡 To test, run: node test-backup.js\n`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

