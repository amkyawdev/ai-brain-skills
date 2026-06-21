# Accessibility (WCAG)

## Guidelines

### Perceivable
- Text alternatives for images
- Captions for videos
- Color contrast ratios (4.5:1 minimum)
- Resizable text

### Operable
- Keyboard navigation
- Skip links
- Focus indicators
- No seizure-inducing content

### Understandable
- Clear language
- Consistent navigation
- Error identification
- Input assistance

## ARIA Attributes

```html
<nav aria-label="Main">
  <ul role="list">
    <li><a href="/" aria-current="page">Home</a></li>
  </ul>
</nav>

<button aria-expanded="false" aria-controls="menu">
  Menu
</button>

<div id="menu" hidden>
  <!-- Menu content -->
</div>
```

## Testing

- Use screen readers (NVDA, VoiceOver)
- Run automated tests (axe-core)
- Manual keyboard testing
- Color contrast checker
