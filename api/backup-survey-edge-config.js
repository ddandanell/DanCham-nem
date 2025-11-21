/**
 * Vercel Serverless Function using Edge Config
 * 
 * NOTE: Edge Config is read-optimized and not ideal for storing form submissions.
 * Writing requires Vercel API calls which is complex. 
 * 
 * RECOMMENDED: Use Vercel KV instead (see backup-survey.js with KV option)
 * 
 * This is a workaround using Edge Config, but it's not the best solution.
 */

import { get, getAll } from '@vercel/edge-config';

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

    // Edge Config is read-only via SDK, writing requires Vercel API
    // For now, we'll log it and you can manually add to Edge Config if needed
    console.log('📦 BACKUP SUBMISSION (Edge Config not ideal for writes):', JSON.stringify(submissionData, null, 2));

    // To actually write to Edge Config, you'd need to use Vercel API:
    // const vercelToken = process.env.VERCEL_TOKEN;
    // await fetch(`https://api.vercel.com/v1/edge-config/${process.env.EDGE_CONFIG_ID}/items`, {
    //   method: 'PATCH',
    //   headers: { 'Authorization': `Bearer ${vercelToken}` },
    //   body: JSON.stringify({ items: [{ operation: 'update', key: id, value: submissionData }] })
    // });

    return res.status(200).json({ 
      success: true, 
      message: 'Backup received (logged - Edge Config not ideal for dynamic writes)',
      id: id,
      recommendation: 'Consider using Vercel KV instead for better performance'
    });
  } catch (err) {
    console.error('Error processing backup:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

