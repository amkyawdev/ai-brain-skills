# Web Vitals

## Core Web Vitals

### LCP (Largest Contentful Paint)
- **Target:** < 2.5s
- Measures loading performance

### FID (First Input Delay)
- **Target:** < 100ms
- Measures interactivity

### CLS (Cumulative Layout Shift)
- **Target:** < 0.1
- Measures visual stability

## Other Metrics

- TTFB (Time to First Byte)
- FCP (First Contentful Paint)
- TTI (Time to Interactive)

## Optimization

```javascript
// Measure with web-vitals library
import { onLCP, onFID, onCLS } from 'web-vitals';

onLCP(console.log);
onFID(console.log);
onCLS(console.log);
```

## Tools

- Chrome DevTools
- PageSpeed Insights
- Lighthouse
- Web Vitals extension
