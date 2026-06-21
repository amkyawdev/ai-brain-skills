#!/usr/bin/env node
/**
 * Config Parser
 * Parses JSON/YAML configuration files
 */

const fs = require('fs');
const yaml = require('js-yaml');

function parseConfig(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  if (filePath.endsWith('.json')) {
    return JSON.parse(content);
  } else if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
    return yaml.load(content);
  }
  
  throw new Error(`Unsupported config format: ${filePath}`);
}

module.exports = { parseConfig };
