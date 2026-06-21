# Next.js Skill

**Category:** Domain - Web Frontend  
**Priority:** 75

## Overview

Expert knowledge for Next.js application development using the App Router.

## Key Topics

- App Router architecture
- Server Components vs Client Components
- Server Actions
- Data fetching patterns
- Caching strategies
- Middleware

## References

- [App Router Deep Dive](./references/app-router-deep-dive.md)
- [Server Actions Advanced](./references/server-actions-advanced.md)
- [Caching Strategies](./references/caching-strategies.md)
- [Middleware Patterns](./references/middleware-patterns.md)
- [Image Optimization](./references/image-optimization.md)
- [Internationalization](./references/internationalization.md)

## Templates

- [page.tsx](./templates/page.tsx)
- [layout.tsx](./templates/layout.tsx)
- [loading.tsx](./templates/loading.tsx)
- [error.tsx](./templates/error.tsx)
- [not-found.tsx](./templates/not-found.tsx)

## Usage

```tsx
// app/page.tsx
export default async function Page() {
  const data = await fetchData();
  return <main>{data}</main>;
}
```

## Best Practices

1. Use Server Components by default
2. Add 'use client' only when needed
3. Leverage caching for performance
4. Use Server Actions for mutations
5. Implement proper error boundaries
