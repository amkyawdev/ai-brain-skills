#!/usr/bin/env node
/**
 * Documentation Generator
 * Generates documentation from skill metadata
 */

const fs = require('fs');
const path = require('path');

function generateDocs(skillsDir, outputDir) {
  const skills = [];
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        if (fs.existsSync(path.join(filePath, 'SKILL.md'))) {
          skills.push(filePath);
        }
        walkDir(filePath);
      }
    });
  }
  
  walkDir(skillsDir);
  
  const index = skills.map(s => ({
    path: s.replace(skillsDir, ''),
    name: path.basename(s),
  }));
  
  fs.writeFileSync(
    path.join(outputDir, 'index.json'),
    JSON.stringify(index, null, 2)
  );
  
  console.log(`✓ Generated docs index with ${skills.length} skills`);
}

module.exports = { generateDocs };
