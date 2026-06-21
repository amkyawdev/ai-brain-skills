# Advanced Skill Techniques

## Skill Chaining

Chain multiple skills for complex workflows:

```
Load: core/context-orchestrator
Then: domain/web-frontend/react
Finally: backend/api-design
```

## Meta Skills

Create skills that manage other skills:

```markdown
# Meta Skill

This skill loads related skills based on context.
```

## Hooks

Use pre/post hooks for skill execution:

- `pre-skill/`: Runs before skill
- `post-skill/`: Runs after skill
- `error/`: Runs on error
