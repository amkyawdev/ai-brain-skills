# React Hooks Patterns

## Common Hooks

### useState
```tsx
const [state, setState] = useState<Type>(initialValue);
```

### useEffect
```tsx
useEffect(() => {
  // Effect logic
  return () => {}; // Cleanup
}, [dependencies]);
```

### useCallback
```tsx
const memoizedFn = useCallback(() => {
  return computeExpensive(a, b);
}, [a, b]);
```

### useMemo
```tsx
const memoizedValue = useMemo(() => {
  return expensiveCalculation(items);
}, [items]);
```

### useRef
```tsx
const ref = useRef<HTMLDivElement>(null);
```

## Custom Hooks

```tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
}
```

## Patterns

1. **Extract logic into custom hooks**
2. **Use composition over duplication**
3. **Keep hooks at top level**
4. **Always handle cleanup**
