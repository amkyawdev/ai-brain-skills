#!/usr/bin/env node
/**
 * Schema Validator
 * Validates skill frontmatter schema
 */

const z = require('zod');

const SkillSchema = z.object({
  name: z.string(),
  category: z.string(),
  priority: z.number().optional().default(50),
  autoLoad: z.boolean().optional().default(false),
  tags: z.array(z.string()).optional(),
});

function validateSchema(data) {
  try {
    return SkillSchema.parse(data);
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

module.exports = { validateSchema, SkillSchema };
