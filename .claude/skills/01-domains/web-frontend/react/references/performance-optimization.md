# Performance Optimization

## Techniques

### 1. Memoization
```tsx
const MemoizedComponent = React.memo(ExpensiveComponent);
const memoizedValue = useMemo(() => compute(items), [items]);
const memoizedCallback = useCallback(fn, deps);
```

### 2. Code Splitting
```tsx
const LazyComponent = React.lazy(() => import('./Heavy'));
```

### 3. Virtualization
```tsx
import { FixedSizeList } from 'react-window';
```

### 4. Lazy Loading Images
```tsx
<img loading="lazy" src={src} />
```

## Common Pitfalls

- Over-memoization
- Anonymous functions in render
- Large bundle sizes
- Unnecessary re-renders

## Profiling

Use React DevTools Profiler to identify:
- Components re-rendering too often
- Expensive calculations
- Large component trees
