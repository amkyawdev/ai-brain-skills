# Caching Strategies

## Static Generation (SSG)

```tsx
export async function generateStaticParams() {
  const posts = await db.post.findMany();
  return posts.map((post) => ({ slug: post.slug }));
}
```

## Dynamic Rendering (SSR)

```tsx
export const dynamic = 'force-dynamic';

export default async function Page() {
  const data = await fetch('/api/data', { cache: 'no-store' });
  return <div>{data}</div>;
}
```

## ISR (Incremental Static Regeneration)

```tsx
export const revalidate = 3600;

export default async function Page() {
  const posts = await fetchPosts();
  return <BlogList posts={posts} />;
}
```

## fetch() Caching

```tsx
// Default: cache automatically
const data = await fetch('https://api.example.com/data');

// No cache
const fresh = await fetch('https://api.example.com/data', { 
  cache: 'no-store' 
});

// Cache with TTL
const cached = await fetch('https://api.example.com/data', { 
  next: { revalidate: 60 } 
});
```

## Route Segment Config

```tsx
export const dynamic = 'auto';
export const revalidate = false;          // Static
export const revalidate = 0;              // Dynamic
export const revalidate = 3600;           // ISR
export const dynamic = 'force-static';    // Force static
export const dynamic = 'force-dynamic';   // Force dynamic
```
