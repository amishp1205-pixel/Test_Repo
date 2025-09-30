#!/bin/bash

# Start the FastAPI backend
echo "🐱 Starting KatGPT Backend..."

# Check if .env file exists, if not create it from template
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please edit .env file and add your OpenAI API key!"
    echo "   Then run this script again."
    exit 1
fi

# Activate virtual environment
source demo-venv/bin/activate

cd backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
