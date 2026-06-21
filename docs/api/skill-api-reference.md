# Skill API Reference

## Skill Interface

```typescript
interface Skill {
  name: string;
  path: string;
  category: string;
  priority: number;
  autoLoad: boolean;
  tags: string[];
}
```

## Methods

### loadSkill(name: string): Skill
Loads a skill by name.

### unloadSkill(name: string): void
Unloads a skill from memory.

### listSkills(): Skill[]
Lists all available skills.
