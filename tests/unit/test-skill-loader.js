const { SkillCache } = require('../../shared/lib/cache/skill-cache');

describe('Skill Loader', () => {
  let cache;
  
  beforeEach(() => {
    cache = new SkillCache(3);
  });
  
  test('should cache skills', () => {
    cache.set('skill1', { name: 'Test Skill' });
    expect(cache.get('skill1')).toEqual({ name: 'Test Skill' });
  });
  
  test('should evict LRU items', () => {
    cache.set('skill1', { name: 'Skill 1' });
    cache.set('skill2', { name: 'Skill 2' });
    cache.set('skill3', { name: 'Skill 3' });
    cache.set('skill4', { name: 'Skill 4' });
    
    expect(cache.get('skill1')).toBeNull();
    expect(cache.get('skill4')).toEqual({ name: 'Skill 4' });
  });
});
