#!/usr/bin/env node
/**
 * Skill Cache
 * Caches loaded skills for performance
 */

class SkillCache {
  constructor(maxSize = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }
  
  get(key) {
    const item = this.cache.get(key);
    if (item) {
      item.lastAccessed = Date.now();
      return item.value;
    }
    return null;
  }
  
  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      // Evict least recently used
      let oldest = null;
      let oldestTime = Infinity;
      
      for (const [k, v] of this.cache) {
        if (v.lastAccessed < oldestTime) {
          oldest = k;
          oldestTime = v.lastAccessed;
        }
      }
      
      if (oldest) {
        this.cache.delete(oldest);
      }
    }
    
    this.cache.set(key, { value, lastAccessed: Date.now() });
  }
  
  clear() {
    this.cache.clear();
  }
  
  size() {
    return this.cache.size;
  }
}

module.exports = { SkillCache };
