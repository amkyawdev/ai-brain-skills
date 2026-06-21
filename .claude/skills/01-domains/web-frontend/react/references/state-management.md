# State Management

## Local vs Global State

### Local State
- Use `useState` for component-specific state
- Lift state up when needed

### Global State Solutions

1. **Context API**
   - Built-in React solution
   - Good for theme, auth, locale
   - Can cause unnecessary re-renders

2. **Zustand**
   - Minimal boilerplate
   - Good performance
   - TypeScript friendly

3. **Jotai**
   - Atomic approach
   - Granular re-renders
   - Composable

4. **Redux Toolkit**
   - Predictable state
   - DevTools integration
   - More boilerplate

## Best Practices

1. Start with local state
2. Extract to Context when shared
3. Use external state library for complex apps
4. Normalize deeply nested data
5. Use selectors for derived data
