# Image Optimization

## Basic Usage

```tsx
import Image from 'next/image';

export function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={1200}
      height={600}
      priority
    />
  );
}
```

## Responsive Images

```tsx
<Image
  src="/hero.jpg"
  alt="Responsive hero"
  sizes="(max-width: 768px) 100vw, 50vw"
  fill
  style={{ objectFit: 'cover' }}
/>
```

## Remote Images

```js
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};
```

## Priority Loading

```tsx
<Image
  src={heroImage}
  alt="Critical hero"
  priority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

## Best Practices

1. Always specify width and height
2. Use `priority` for above-fold images
3. Use `fill` with sized containers
4. Use `sizes` for responsive images
5. Use meaningful alt text
