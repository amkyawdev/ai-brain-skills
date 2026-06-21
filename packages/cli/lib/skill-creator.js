const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

class SkillCreator {
  constructor(rootPath) {
    this.rootPath = rootPath;
    this.skillsDir = path.join(rootPath, '.amkyaw', 'skills');
  }

  async create(name, options) {
    console.log(chalk.blue(`\n🎨 Creating skill: ${name}\n`));
    
    const category = options.category || '04-custom';
    const skillPath = path.join(this.skillsDir, category, name);
    
    if (fs.existsSync(skillPath)) {
      console.log(chalk.red(`❌ Skill "${name}" already exists!`));
      return;
    }

    // Create directory structure
    fs.mkdirSync(skillPath, { recursive: true });
    fs.mkdirSync(path.join(skillPath, 'references'), { recursive: true });
    fs.mkdirSync(path.join(skillPath, 'scripts'), { recursive: true });
    fs.mkdirSync(path.join(skillPath, 'templates'), { recursive: true });

    // Create SKILL.md
    const skillMd = `# ${name}

**Category:** ${category}  
**Priority:** ${options.priority || 70}
**Created:** ${new Date().toISOString().split('T')[0]}

## Overview

Describe what this skill does and when to use it.

## Key Topics

- Topic 1
- Topic 2
- Topic 3

## Usage

### Basic Usage

\`\`\`bash
# Example command
\`\`\`

### Advanced Usage

Describe advanced usage patterns.

## Examples

### Example 1

\`\`\`javascript
// Code example
\`\`\`

## References

- [Reference Guide](./references/guide.md)

## Related Skills

- Related skill 1
- Related skill 2
`;

    fs.writeFileSync(path.join(skillPath, 'SKILL.md'), skillMd);

    // Create reference
    const refMd = `# ${name} - Reference Guide

## Detailed Reference

Add detailed reference information here.

## API Reference

### Methods

| Method | Description |
|--------|-------------|
| method1 | Description |

### Configuration

\`\`\`json
{
  "key": "value"
}
\`\`\`
`;

    fs.writeFileSync(path.join(skillPath, 'references', 'guide.md'), refMd);

    // Create script
    const scriptJs = `#!/usr/bin/env node
/**
 * ${name} script
 */

function main() {
  console.log('Running ${name}...');
}

if (require.main === module) {
  main();
}

module.exports = { main };
`;

    fs.writeFileSync(path.join(skillPath, 'scripts', 'index.js'), scriptJs);

    // Create template
    const template = `---
name: ${name}-template
---

# ${name} Template

Use this template for ${name} projects.
`;

    fs.writeFileSync(path.join(skillPath, 'templates', 'default.md'), template);

    console.log(chalk.green(`✅ Skill "${name}" created successfully!`));
    console.log(chalk.gray(`\nLocation: ${skillPath}\n`));
    console.log(chalk.yellow('Next steps:'));
    console.log(`  1. Edit: ${path.join(skillPath, 'SKILL.md')}`);
    console.log(`  2. Add references in: ${path.join(skillPath, 'references/')}`);
    console.log(`  3. Run: amkyaw validate\n`);
  }
}

module.exports = SkillCreator;
