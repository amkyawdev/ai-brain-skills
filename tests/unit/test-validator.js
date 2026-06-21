const { validateSchema, SkillSchema } = require('../../shared/lib/validators/schema-validator');

describe('Schema Validator', () => {
  test('should validate correct schema', () => {
    const data = {
      name: 'test-skill',
      category: 'web-frontend',
      priority: 80,
    };
    
    const result = validateSchema(data);
    expect(result.name).toBe('test-skill');
  });
  
  test('should reject invalid schema', () => {
    const data = {
      category: 'web-frontend',
      // missing name
    };
    
    expect(() => validateSchema(data)).toThrow();
  });
});
