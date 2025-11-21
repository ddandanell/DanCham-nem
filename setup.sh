#!/bin/bash

# DanCham Survey Backup Server Setup Script
# This script sets up everything needed for the backup server

echo "🚀 Setting up DanCham Survey Backup Server..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first:"
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js found: $(node --version)"
echo "✓ npm found: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✓ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start the server: npm start"
echo "2. Update BACKUP_ENDPOINT in index.html with your server URL"
echo "3. Test the server by visiting: http://localhost:3000/health"
echo ""
echo "For production deployment, see BACKUP_SETUP.md"

