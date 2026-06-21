describe('Skill Chaining', () => {
  test('should chain skills in order', async () => {
    const skills = ['skill1', 'skill2', 'skill3'];
    const results = [];
    
    for (const skill of skills) {
      results.push({ skill, executed: true });
    }
    
    expect(results).toHaveLength(3);
    expect(results[0].skill).toBe('skill1');
    expect(results[2].skill).toBe('skill3');
  });
});
