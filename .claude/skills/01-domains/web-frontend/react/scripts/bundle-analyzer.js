#!/usr/bin/env node
/**
 * Bundle Analyzer
 * Analyzes React bundle sizes
 */

const fs = require('fs');

function analyzeBundle(bundlePath) {
  if (!fs.existsSync(bundlePath)) {
    console.error(`Bundle not found: ${bundlePath}`);
    process.exit(1);
  }
  
  const stats = fs.statSync(bundlePath);
  const sizeKB = (stats.size / 1024).toFixed(2);
  
  console.log(`Bundle: ${bundlePath}`);
  console.log(`Size: ${sizeKB} KB`);
  
  if (stats.size > 500 * 1024) {
    console.warn('⚠️ Bundle exceeds 500KB - consider code splitting');
  }
}

const bundlePath = process.argv[2] || './dist/bundle.js';
analyzeBundle(bundlePath);
