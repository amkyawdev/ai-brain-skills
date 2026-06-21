# Skill Creation Guide

## Creating a New Skill

### 1. Create Directory Structure

```
.claude/skills/01-domains/my-skill/
├── SKILL.md
├── references/
│   └── guide.md
└── scripts/
    └── tool.js
```

### 2. Write SKILL.md

```markdown
# My Skill

**Category:** Domain  
**Priority:** 70

## Overview

Describe your skill...

## Key Topics

- Topic 1
- Topic 2
```

### 3. Add References

Create detailed reference documents in `references/`.

### 4. Add Scripts

Add executable scripts in `scripts/`.

## Validation

```bash
npm run validate
npm run lint
```
