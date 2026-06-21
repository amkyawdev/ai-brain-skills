#!/usr/bin/env node
/**
 * Skill Validator
 * Validates skill structure and content
 */

const fs = require('fs');
const path = require('path');

function validateSkill(skillPath) {
  const issues = [];
  
  // Check SKILL.md exists
  if (!fs.existsSync(path.join(skillPath, 'SKILL.md'))) {
    issues.push('Missing SKILL.md');
  }
  
  // Check references directory structure
  const referencesPath = path.join(skillPath, 'references');
  if (fs.existsSync(referencesPath)) {
    const files = fs.readdirSync(referencesPath);
    files.forEach(file => {
      if (!file.endsWith('.md')) {
        issues.push(`Non-markdown file in references: ${file}`);
      }
    });
  }
  
  return {
    valid: issues.length === 0,
    issues,
  };
}

module.exports = { validateSkill };
