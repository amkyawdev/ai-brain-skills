# Vue Composition API

## Setup Function

```vue
<script setup>
import { ref, computed, onMounted } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);

function increment() {
  count.value++;
}

onMounted(() => {
  console.log('Component mounted');
});
</script>
```

## Lifecycle Hooks

| Options API | Composition API |
|-------------|-----------------|
| created | (setup runs) |
| mounted | onMounted |
| updated | onUpdated |
| unmounted | onUnmounted |

## Composables

```typescript
// useCounter.ts
import { ref } from 'vue';

export function useCounter(initial = 0) {
  const count = ref(initial);
  
  function increment() {
    count.value++;
  }
  
  function decrement() {
    count.value--;
  }
  
  return { count, increment, decrement };
}
```

## Best Practices

1. Use `<script setup>` syntax
2. Extract reusable logic into composables
3. Use `ref` for primitives, `reactive` for objects
4. Provide type safety with TypeScript
