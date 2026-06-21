# Responsive Design

## Breakpoints

```css
/* Mobile first */
.container {
  padding: 1rem;
}

@media (min-width: 640px) {
  .container { padding: 2rem; }
}

@media (min-width: 1024px) {
  .container { max-width: 1200px; margin: 0 auto; }
}
```

## Flexbox

```css
.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.flex-item {
  flex: 1 1 300px;
}
```

## Grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
```

## Fluid Typography

```css
html {
  font-size: clamp(1rem, 0.5rem + 2vw, 1.25rem);
}
```

## Images

```css
img {
  max-width: 100%;
  height: auto;
}

.hero-image {
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
```
