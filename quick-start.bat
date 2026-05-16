@echo off
REM RaiTech Portfolio - Quick Start Script (Windows)
REM Initializes the portfolio for local development

echo.
echo 🚀 RaiTech Portfolio - Quick Start
echo ==================================
echo.

REM Check for Node.js
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ Node.js found: 
    node --version
) else (
    echo ⚠️  Node.js is not installed. Visit https://nodejs.org/
)

REM Check for Python
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ Python found
) else (
    echo ❌ Python not found. Please install Python to run the development server.
    pause
    exit /b 1
)

REM Install npm dependencies
echo.
echo 📦 Installing dependencies...
if exist package.json (
    npm install --silent
    echo ✓ Dependencies installed
)

REM Start development server
echo.
echo 🌐 Starting development server...
echo ==================================
echo.
echo 📍 Server running at: http://localhost:8000
echo 📍 Press Ctrl+C to stop
echo.

python -m http.server 8000 --directory .

echo.
echo ✓ Server stopped
