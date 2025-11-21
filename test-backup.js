/**
 * Test script for the backup server
 * Run this to verify your backup server is working correctly
 * 
 * Usage: node test-backup.js [endpoint-url]
 * Example: node test-backup.js http://localhost:3000/api/backup-survey
 */

const BACKUP_ENDPOINT = process.argv[2] || 'http://localhost:3000/api/backup-survey';

async function testBackup() {
  console.log('🧪 Testing backup server...\n');
  console.log(`📍 Endpoint: ${BACKUP_ENDPOINT}\n`);

  // Test data
  const testData = {
    submitted_at: new Date().toISOString(),
    response_language: 'en',
    contact_name: 'Test User',
    contact_email: 'test@example.com',
    contact_whatsapp: '+62 812 3456 7890',
    answers: {
      overall_satisfaction: 5,
      reason_for_joining: 'Networking',
      test_field: 'This is a test submission'
    }
  };

  try {
    console.log('📤 Sending test submission...');
    const response = await fetch(BACKUP_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Success!');
      console.log(`   Message: ${result.message}`);
      console.log(`   Total submissions: ${result.total_submissions}`);
      console.log('\n✓ Backup server is working correctly!');
      console.log(`\n💡 Check backups/submissions.json to see your test submission.`);
    } else {
      console.log('❌ Error:', result.error || 'Unknown error');
      process.exit(1);
    }
  } catch (err) {
    console.log('❌ Failed to connect to backup server');
    console.log(`   Error: ${err.message}`);
    console.log('\n💡 Make sure the server is running: npm start');
    process.exit(1);
  }
}

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
  console.log('❌ This script requires Node.js 18+ or install node-fetch');
  console.log('   Alternatively, test using curl:');
  console.log(`   curl -X POST ${BACKUP_ENDPOINT} \\`);
  console.log('     -H "Content-Type: application/json" \\');
  console.log('     -d \'{"submitted_at":"2025-01-15T10:00:00.000Z","test":true}\'');
  process.exit(1);
}

testBackup();

