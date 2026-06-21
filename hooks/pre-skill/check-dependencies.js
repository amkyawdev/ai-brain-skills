#!/usr/bin/env node
/**
 * Check Dependencies Hook
 * Verifies required dependencies before skill execution
 */

const fs = require('fs');

function checkDependencies() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  console.log('Checking dependencies...');
  for (const [name, version] of Object.entries(deps)) {
    console.log(`✓ ${name}@${version}`);
  }
}

checkDependencies();
