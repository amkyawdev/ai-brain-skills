#!/usr/bin/env node
/**
 * API Linter
 * Validates API designs against best practices
 */

const fs = require('fs');
const yaml = require('js-yaml');

function lintAPI(spec) {
  const issues = [];
  
  // Check for proper HTTP methods
  const paths = spec.paths || {};
  for (const [path, methods] of Object.entries(paths)) {
    if (path.match(/[A-Z]/)) {
      issues.push(`Path should use lowercase: ${path}`);
    }
    
    for (const [method, spec] of Object.entries(methods)) {
      if (method !== 'parameters') {
        if (!spec.responses) {
          issues.push(`${method.toUpperCase()} ${path} missing responses`);
        }
        if (!spec.summary) {
          issues.push(`${method.toUpperCase()} ${path} missing summary`);
        }
      }
    }
  }
  
  if (issues.length === 0) {
    console.log('✓ No issues found');
  } else {
    issues.forEach(i => console.log(`✗ ${i}`));
  }
  
  return issues;
}

const specFile = process.argv[2];
if (!specFile) {
  console.error('Usage: node api-linter.js <openapi-spec.yaml>');
  process.exit(1);
}

const spec = yaml.load(fs.readFileSync(specFile, 'utf8'));
lintAPI(spec);
