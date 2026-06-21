#!/usr/bin/env node
/**
 * Markdown Parser
 * Parses skill markdown files
 */

const fs = require('fs');

function parseMarkdown(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
  let frontmatter = {};
  
  if (frontmatterMatch) {
    frontmatterMatch[1].split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        frontmatter[key.trim()] = valueParts.join(':').trim();
      }
    });
  }
  
  // Extract code blocks
  const codeBlocks = content.match(/```[\s\S]*?```/g) || [];
  
  return {
    frontmatter,
    codeBlocks,
    content: content.replace(/^---\n[\s\S]*?\n---\n/, ''),
  };
}

module.exports = { parseMarkdown };
