#!/bin/bash

echo "🐱 Setting up KatGPT - Cat Q&A AI Application"
echo "=============================================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is required but not installed."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Setup backend
echo "📦 Installing Python dependencies in virtual environment..."

# Check if virtual environment exists
if [ ! -d "demo-venv" ]; then
    echo "⚠️  Virtual environment 'demo-venv' not found!"
    echo "💡 Please create it first: python3 -m venv demo-venv"
    exit 1
fi

# Activate virtual environment and install dependencies
source demo-venv/bin/activate
pip install --upgrade pip setuptools wheel
pip install -r requirements-minimal.txt

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed successfully!"
else
    echo "❌ Failed to install backend dependencies."
    echo "💡 Try running: pip install --upgrade pip setuptools wheel"
    exit 1
fi

# Setup frontend
echo "📦 Installing Node.js dependencies..."
cd frontend
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed successfully!"
    cd ..
else
    echo "❌ Failed to install frontend dependencies."
    exit 1
fi

# Setup .env file
echo "📝 Setting up environment configuration..."
if [ ! -f .env ]; then
    cp env.example .env
    echo "✅ Created .env file from template"
    echo "⚠️  Please edit .env file and add your OpenAI API key!"
else
    echo "✅ .env file already exists"
fi

echo "🎉 Setup complete!"
echo ""
echo "🚀 To start the application:"
echo "   1. Edit .env file and add your OpenAI API key"
echo "   2. Start backend: ./start_backend.sh"
echo "   3. Start frontend: ./start_frontend.sh (in a new terminal)"
echo ""
echo "📖 For more information, see README.md"
echo "🐱 Enjoy asking questions about cats!"
