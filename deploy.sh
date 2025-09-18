#!/bin/bash

# Deployment script for Smartschool ERP to GitHub Pages

echo "🚀 Starting deployment to GitHub Pages..."

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Check if there are uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Warning: You have uncommitted changes"
    read -p "Do you want to continue? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deployment cancelled"
        exit 1
    fi
fi

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
npm run deploy

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🔗 Your app will be available at: https://dhrushti.siddamvamsee.in"
    echo "🔗 Fallback GitHub Pages URL: https://ssvamsee.github.io/drishti"
    echo "⏱️  It may take a few minutes for changes to be visible"
    echo "📋 Make sure your DNS is configured correctly for the custom domain"
else
    echo "❌ Deployment failed"
    exit 1
fi
