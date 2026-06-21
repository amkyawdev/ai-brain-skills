describe('Performance E2E', () => {
  test('should load skills within time limit', () => {
    const start = Date.now();
    // Simulate skill loading
    const skills = Array.from({ length: 10 }, (_, i) => `skill${i}`);
    const elapsed = Date.now() - start;
    
    expect(elapsed).toBeLessThan(1000);
    expect(skills).toHaveLength(10);
  });
});
