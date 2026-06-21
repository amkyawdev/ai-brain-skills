const { ContextCache } = require('../../shared/lib/cache/context-cache');

describe('Context Orchestrator', () => {
  let cache;
  
  beforeEach(() => {
    cache = new ContextCache(1000);
  });
  
  test('should cache context', () => {
    cache.set('key1', { data: 'test' });
    expect(cache.get('key1')).toEqual({ data: 'test' });
  });
  
  test('should expire after TTL', async () => {
    cache.set('key1', { data: 'test' });
    await new Promise(resolve => setTimeout(resolve, 1100));
    expect(cache.get('key1')).toBeNull();
  });
});
