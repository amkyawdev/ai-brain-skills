# Context Orchestrator Skill

**Category:** Core Infrastructure  
**Auto-loaded:** Yes  
**Priority:** 95

## Overview

Manages context loading, prioritization, and compression for optimal AI performance.

## Features

### Context Loading
- Automatic skill loading based on file types
- Priority-based skill selection
- Dependency resolution for skill chains

### Context Compression
- Remove redundant information
- Summarize long content
- Preserve critical context

### Scripts

- [Context Compressor](./scripts/context-compressor.py) - Compress large contexts

## Usage

Context is automatically managed. For manual control:

```
Load skill: <domain>/<subdomain>
Unload skill: /unload <skill-name>
```

## Configuration

See `context-rules.json` for automatic loading rules.
