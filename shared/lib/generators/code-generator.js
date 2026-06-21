#!/usr/bin/env node
/**
 * Code Generator
 * Generates code from templates
 */

const fs = require('fs');
const path = require('path');

function generateCode(templatePath, outputPath, variables = {}) {
  let template = fs.readFileSync(templatePath, 'utf8');
  
  // Simple variable substitution
  Object.entries(variables).forEach(([key, value]) => {
    template = template.replace(new RegExp(`{{${key}}}`, 'g'), value);
  });
  
  fs.writeFileSync(outputPath, template);
  console.log(`✓ Generated: ${outputPath}`);
}

module.exports = { generateCode };
