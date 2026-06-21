# Vue Skill

**Category:** Domain - Web Frontend  
**Priority:** 70

## Overview

Expert knowledge for Vue.js application development.

## Key Topics

- Composition API
- Reactivity system
- Vue Router
- Pinia state management
- Nuxt.js framework

## References

- [Composition API](./references/composition-api.md)

## Usage

```vue
<script setup>
import { ref, computed } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);

function increment() {
  count.value++;
}
</script>

<template>
  <button @click="increment">{{ count }} ({{ doubled }})</button>
</template>
```
