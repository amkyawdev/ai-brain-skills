# App Router Deep Dive

## Directory Structure

```
app/
├── layout.tsx      # Root layout
├── page.tsx        # Home page
├── globals.css     # Global styles
└── about/
    └── page.tsx    # /about route
```

## Server Components

- Render on server by default
- Can be async (await data fetching)
- Cannot use hooks or browser APIs
- Automatic code splitting

```tsx
async function Page() {
  const data = await db.query('SELECT * FROM posts');
  return <main>{data}</main>;
}
```

## Client Components

Add 'use client' directive:

```tsx
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## Nested Layouts

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <Sidebar />
      {children}
    </div>
  );
}
```

## Route Groups

Use parentheses for grouping without affecting URL:

```
app/(marketing)/about/page.tsx → /about
app/(app)/dashboard/page.tsx   → /dashboard
```
