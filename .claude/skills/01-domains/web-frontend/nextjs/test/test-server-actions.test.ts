import { describe, it, expect } from '@jest/globals';
import { createPost } from '../templates/actions';

describe('Server Actions', () => {
  it('should create a post', async () => {
    const result = await createPost({ title: 'Test', content: 'Content' });
    expect(result.success).toBe(true);
  });
});
