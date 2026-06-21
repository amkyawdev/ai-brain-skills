const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

class Validator {
  constructor(rootPath) {
    this.rootPath = rootPath;
    this.skillsDir = path.join(rootPath, '.amkyaw', 'skills');
    this.issues = [];
    this.stats = { total: 0, valid: 0, warnings: 0 };
  }

  async validateAll() {
    console.log(chalk.blue('\n🔍 Validating all skills...\n'));
    
    const skills = this.collectSkills();
    this.stats.total = skills.length;

    for (const skill of skills) {
      await this.validateSkill(skill);
    }

    this.displayResults();
  }

  collectSkills() {
    const skills = [];
    const walk = (dir, category = '') => {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          if (item.match(/^\d+-/)) {
            walk(fullPath, item);
          } else {
            const skillFile = path.join(fullPath, 'SKILL.md');
            if (fs.existsSync(skillFile)) {
              skills.push({ name: item, path: fullPath, category });
            } else {
              walk(fullPath, category);
            }
          }
        }
      }
    };
    
    walk(this.skillsDir);
    return skills;
  }

  async validateSkill(skill) {
    const issues = [];
    
    // Check SKILL.md exists
    const skillFile = path.join(skill.path, 'SKILL.md');
    if (!fs.existsSync(skillFile)) {
      issues.push({ type: 'error', message: 'SKILL.md not found' });
    } else {
      const content = fs.readFileSync(skillFile, 'utf8');
      
      // Validate frontmatter
      if (!content.includes('**Category:**')) {
        issues.push({ type: 'warning', message: 'Missing category' });
      }
      if (!content.includes('**Priority:**')) {
        issues.push({ type: 'warning', message: 'Missing priority' });
      }
      if (!content.startsWith('# ')) {
        issues.push({ type: 'error', message: 'Missing title' });
      }
      
      // Check content length
      if (content.length < 100) {
        issues.push({ type: 'warning', message: 'Content too short' });
      }
    }

    // Check references directory
    const refsDir = path.join(skill.path, 'references');
    if (!fs.existsSync(refsDir)) {
      issues.push({ type: 'info', message: 'No references directory' });
    }

    if (issues.filter(i => i.type === 'error').length === 0) {
      this.stats.valid++;
    }
    this.stats.warnings += issues.filter(i => i.type === 'warning').length;

    if (issues.length > 0) {
      this.issues.push({ skill: skill.name, category: skill.category, issues });
    }
  }

  displayResults() {
    console.log(chalk.blue('─'.repeat(50)));
    console.log(`\n📊 Total Skills: ${this.stats.total}`);
    console.log(chalk.green(`  ✅ Valid: ${this.stats.valid}`));
    console.log(chalk.yellow(`  ⚠️  Warnings: ${this.stats.warnings}`));
    
    if (this.issues.length > 0) {
      console.log(chalk.red(`\n  ❌ Issues Found: ${this.issues.length}\n`));
      
      this.issues.forEach(({ skill, category, issues }) => {
        console.log(chalk.cyan(`  ${skill} (${category})`));
        issues.forEach(issue => {
          const icon = issue.type === 'error' ? '❌' : issue.type === 'warning' ? '⚠️' : 'ℹ️';
          const color = issue.type === 'error' ? chalk.red : chalk.yellow;
          console.log(color(`    ${icon} ${issue.message}`));
        });
      });
    }
    
    console.log(chalk.blue('\n' + '─'.repeat(50) + '\n'));
  }
}

module.exports = Validator;
