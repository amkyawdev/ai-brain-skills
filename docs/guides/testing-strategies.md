# Testing Strategies

## Unit Tests

```javascript
test('should load skill', () => {
  const skill = loadSkill('react');
  expect(skill.name).toBe('react');
});
```

## Integration Tests

Test skill interactions:

```javascript
test('should chain skills', () => {
  const result = chainSkills(['skill1', 'skill2']);
  expect(result).toHaveLength(2);
});
```

## E2E Tests

Full workflow testing:

```javascript
test('should complete workflow', () => {
  const result = executeWorkflow('build-and-deploy');
  expect(result.success).toBe(true);
});
```

## Running Tests

```bash
npm test           # All tests
npm run test:unit # Unit tests only
npm run test:e2e  # E2E tests only
```
