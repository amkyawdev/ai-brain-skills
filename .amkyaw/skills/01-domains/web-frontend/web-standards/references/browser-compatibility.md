# Browser Compatibility

## Feature Detection

```javascript
// CSS feature
if (CSS.supports('display', 'grid')) {
  // Use grid
}

// API feature
if ('IntersectionObserver' in window) {
  // Use IntersectionObserver
}
```

## Polyfills

```javascript
// Core JS polyfills
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// CSS polyfills
@supports (display: grid) {
  .grid { display: grid; }
}
```

## Can I Use

Check support at https://caniuse.com/

## Transpilation

Use Babel for JS transpilation
Use Autoprefixer for CSS

## Testing

- Test in target browsers
- Use BrowserStack or similar
- Progressive enhancement
