#!/usr/bin/env node
/**
 * Fallback Handler
 * Provides fallback when skill fails
 */

function handleFallback(skillName, error) {
  console.error(`❌ Skill ${skillName} failed: ${error.message}`);
  
  return {
    fallback: true,
    skill: skillName,
    message: 'Fallback response',
    originalError: error.message,
  };
}

module.exports = { handleFallback };
