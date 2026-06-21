# React Skill

**Category:** Domain - Web Frontend  
**Priority:** 70

## Overview

Expert knowledge for React application development.

## Key Topics

- React Hooks patterns
- State management solutions
- Performance optimization
- Server components (Next.js)
- Testing strategies

## References

- [Hooks Patterns](./references/hooks-patterns.md)
- [State Management](./references/state-management.md)
- [Performance Optimization](./references/performance-optimization.md)

## Scripts

- [Bundle Analyzer](./scripts/bundle-analyzer.js)

## Usage

```tsx
import { useState, useEffect } from 'react';

function Component() {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects
    return () => {}; // Cleanup
  }, [dependencies]);
  
  return <div>{state}</div>;
}
```

## Best Practices

1. Use functional components with hooks
2. Memoize expensive computations
3. Split large components
4. Use TypeScript for type safety
