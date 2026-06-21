describe('Workflows', () => {
  test('should execute workflow', () => {
    const workflow = {
      steps: ['step1', 'step2', 'step3'],
      currentStep: 0,
      
      next() {
        if (this.currentStep < this.steps.length) {
          return this.steps[this.currentStep++];
        }
        return null;
      },
    };
    
    expect(workflow.next()).toBe('step1');
    expect(workflow.next()).toBe('step2');
    expect(workflow.next()).toBe('step3');
    expect(workflow.next()).toBeNull();
  });
});
