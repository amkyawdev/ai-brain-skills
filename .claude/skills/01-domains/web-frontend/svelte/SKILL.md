# Svelte Skill

**Category:** Domain - Web Frontend  
**Priority:** 65

## Overview

Expert knowledge for Svelte application development.

## Key Topics

- Reactive declarations
- Stores
- SvelteKit
- Transitions
- Actions

## Usage

```svelte
<script>
  let count = 0;
  
  $: doubled = count * 2;
</script>

<button on:click={() => count++}>
  {count} ({doubled})
</button>
```
