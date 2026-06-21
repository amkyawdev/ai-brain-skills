#!/usr/bin/env node
/**
 * Validate Context Hook
 * Runs before skill loading
 */

const fs = require('fs');
const path = require('path');

function validateSkill(skillPath) {
  const skillFile = path.join(skillPath, 'SKILL.md');
  if (!fs.existsSync(skillFile)) {
    console.warn(`⚠️ Missing SKILL.md in ${skillPath}`);
    return false;
  }
  return true;
}

const skillPath = process.argv[2];
if (skillPath) {
  validateSkill(skillPath);
}
