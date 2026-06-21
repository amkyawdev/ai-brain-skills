#!/usr/bin/env node
/**
 * Telemetry Hook
 * Collects anonymized usage metrics
 */

function collectTelemetry(skillName, duration, success) {
  const metrics = {
    skill: skillName,
    duration_ms: duration,
    success,
    timestamp: new Date().toISOString(),
  };
  
  // In production, send to telemetry service
  console.log('📊 Telemetry:', JSON.stringify(metrics));
}

const skillName = process.argv[2];
const duration = parseInt(process.argv[3], 10);
const success = process.argv[4] === 'true';

if (skillName) {
  collectTelemetry(skillName, duration || 0, success);
}
