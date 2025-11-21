/**
 * Vercel Serverless Function for Backup
 * 
 * This endpoint receives form submissions and saves them.
 * 
 * OPTION 1: Simple logging (works immediately - no setup)
 * - Logs to Vercel function logs (visible in dashboard)
 * - Good for testing
 * 
 * OPTION 2: Vercel KV (recommended for production - persistent storage)
 * - Uncomment the KV code below
 * - Set up Vercel KV in your Vercel dashboard
 * - Install: npm install @vercel/kv
 */

// ============================================
// OPTION 1: Simple Logging (Default - Works Now)
// ============================================
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const submission = req.body;
    
    // Validate submission data
    if (!submission || !submission.submitted_at) {
      return res.status(400).json({ error: 'Invalid submission data' });
    }

    // Generate unique ID
    const id = `submission-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const submissionData = {
      ...submission,
      backup_received_at: new Date().toISOString(),
      id: id
    };

    // Log to Vercel function logs (visible in Vercel dashboard)
    console.log('📦 BACKUP SUBMISSION:', JSON.stringify(submissionData, null, 2));

    return res.status(200).json({ 
      success: true, 
      message: 'Backup received and logged',
      id: id
    });
  } catch (err) {
    console.error('Error processing backup:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// ============================================
// OPTION 2: Vercel KV (Recommended - Best for storing submissions)
// ============================================
/*
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const submission = req.body;
    
    if (!submission || !submission.submitted_at) {
      return res.status(400).json({ error: 'Invalid submission data' });
    }

    const id = `submission-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const submissionData = {
      ...submission,
      backup_received_at: new Date().toISOString(),
      id: id
    };

    // Save to Vercel KV
    await kv.lpush('dancham-submissions', JSON.stringify(submissionData));
    await kv.set(`submission:${id}`, submissionData);

    return res.status(200).json({ 
      success: true, 
      message: 'Backup saved to Vercel KV',
      id: id
    });
  } catch (err) {
    console.error('Error processing backup:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
*/

// ============================================
// OPTION 3: Vercel KV with Edge Config Connection String
// If you have Edge Config but want to use KV instead
// ============================================

