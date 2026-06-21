# Internationalization

## Project Setup

```bash
npm install next-intl
```

## Configuration

```ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'es', 'de', 'fr'],
  defaultLocale: 'en',
});

export const config = {
  matcher: ['/', '/(de|en|es|fr)/:path*'],
};
```

## Translation Files

```json
// messages/en.json
{
  "greeting": "Hello {name}",
  "footer": {
    "copyright": "© {year} Company"
  }
}
```

## Usage in Components

```tsx
import { getTranslations } from 'next-intl/server';

export default async function Page({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'greeting' });
  
  return (
    <h1>{t('title', { name: 'World' })}</h1>
  );
}
```

## Client Components

```tsx
'use client';

import { useTranslations } from 'next-intl';

export function Counter() {
  const t = useTranslations('counter');
  return <button>{t('increment')}</button>;
}
```
