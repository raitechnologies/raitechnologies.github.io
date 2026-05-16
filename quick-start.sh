#!/bin/bash

# RaiTech Portfolio - Quick Start Script
# Initializes the portfolio for local development

echo "🚀 RaiTech Portfolio - Quick Start"
echo "=================================="

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "⚠️  Node.js is not installed. Visit https://nodejs.org/"
    echo "Continuing with HTTP server..."
else
    echo "✓ Node.js found: $(node --version)"
fi

# Check for Python (for HTTP server)
if command -v python3 &> /dev/null; then
    PYTHON="python3"
elif command -v python &> /dev/null; then
    PYTHON="python"
else
    echo "❌ Python not found. Please install Python to run the development server."
    exit 1
fi

echo "✓ Python found"

# Install npm dependencies
echo ""
echo "📦 Installing dependencies..."
if [ -f "package.json" ]; then
    npm install --silent
    echo "✓ Dependencies installed"
fi

# Start development server
echo ""
echo "🌐 Starting development server..."
echo "=================================="
echo ""
echo "📍 Server running at: http://localhost:8000"
echo "📍 Press Ctrl+C to stop"
echo ""

$PYTHON -m http.server 8000 --directory .

echo ""
echo "✓ Server stopped"
