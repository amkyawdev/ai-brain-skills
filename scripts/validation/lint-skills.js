#!/usr/bin/env node
/**
 * Lint Skills
 * Checks skill formatting and content
 */

const fs = require('fs');
const path = require('path');

function lintSkills(skillsDir) {
  let issues = [];
  
  function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (file === 'SKILL.md') {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.length < 50) {
          issues.push(`${fullPath}: SKILL.md is too short`);
        }
      }
    }
  }
  
  walk(skillsDir);
  
  if (issues.length === 0) {
    console.log('✓ All skills passed linting');
  } else {
    issues.forEach(i => console.error(`✗ ${i}`));
    process.exit(1);
  }
}

lintSkills(process.argv[2] || './.claude/skills');
