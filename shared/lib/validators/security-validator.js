#!/usr/bin/env node
/**
 * Security Validator
 * Scans skill content for security issues
 */

function validateSecurity(content) {
  const issues = [];
  
  // Check for exposed secrets
  const secretPatterns = [
    /password\s*=\s*['"][^'"]+['"]/gi,
    /api[_-]?key\s*=\s*['"][^'"]+['"]/gi,
    /token\s*=\s*['"][^'"]+['"]/gi,
  ];
  
  secretPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      issues.push('Potential secret detected');
    }
  });
  
  return {
    valid: issues.length === 0,
    issues,
  };
}

module.exports = { validateSecurity };
