#!/usr/bin/env node
/**
 * Notify on Failure Hook
 * Sends notification when skill execution fails
 */

function notifyFailure(skillName, error, context) {
  const notification = {
    type: 'skill_failure',
    skill: skillName,
    error: error.message,
    context,
    timestamp: new Date().toISOString(),
  };
  
  console.error('🔔 Failure notification:', JSON.stringify(notification));
  // In production, send to Slack, PagerDuty, etc.
}

module.exports = { notifyFailure };
