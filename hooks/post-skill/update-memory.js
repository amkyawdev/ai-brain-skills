#!/usr/bin/env node
/**
 * Update Memory Hook
 * Updates AGENTS.md with learnings from skill execution
 */

const fs = require('fs');

function updateMemory(skillName, key, value) {
  const agentsPath = 'AGENTS.md';
  let content = '';
  
  if (fs.existsSync(agentsPath)) {
    content = fs.readFileSync(agentsPath, 'utf8');
  }
  
  const entry = `\n## ${skillName} Learning\n- ${key}: ${value}\n`;
  content += entry;
  
  fs.writeFileSync(agentsPath, content);
  console.log(`✓ Memory updated: ${key}`);
}

const skillName = process.argv[2];
const key = process.argv[3];
const value = process.argv[4];

if (skillName && key) {
  updateMemory(skillName, key, value);
}
