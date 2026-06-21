const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

class SkillComparer {
  constructor(rootPath) {
    this.rootPath = rootPath;
    this.skillsDir = path.join(rootPath, '.amkyaw', 'skills');
  }

  async compare(skill1Name, skill2Name) {
    const skill1 = this.findSkill(skill1Name);
    const skill2 = this.findSkill(skill2Name);

    if (!skill1 || !skill2) {
      console.log(chalk.red('\n❌ One or both skills not found!\n'));
      return;
    }

    console.log(chalk.blue(`\n${'═'.repeat(60)}`));
    console.log(chalk.bold.cyan('  Skill Comparison'));
    console.log(chalk.blue('═'.repeat(60)));

    // Display side by side
    console.log(chalk.cyan(`\n  ${skill1.name.padEnd(25)} vs ${skill2.name}`));
    console.log(chalk.gray('─'.repeat(60)));

    const s1Content = this.getSkillContent(skill1);
    const s2Content = this.getSkillContent(skill2);

    // Compare categories
    console.log(chalk.gray(`\n  Category:`));
    console.log(`    ${skill1.category.padEnd(25)} ${skill2.category}`);

    // Compare priorities
    console.log(chalk.gray(`\n  Priority:`));
    console.log(`    ${s1Content.priority}/100`.padEnd(25) + `${s2Content.priority}/100`);

    // Compare topics
    console.log(chalk.gray(`\n  Topics:`));
    const topics1 = s1Content.topics.slice(0, 5);
    const topics2 = s2Content.topics.slice(0, 5);
    const maxTopics = Math.max(topics1.length, topics2.length);
    for (let i = 0; i < maxTopics; i++) {
      console.log(`    ${(topics1[i] || '-').padEnd(25)} ${topics2[i] || '-'}`);
    }

    // Compare files
    console.log(chalk.gray(`\n  Files:`));
    const files1 = this.getSkillFiles(skill1);
    const files2 = this.getSkillFiles(skill2);
    console.log(`    ${files1.length} files`.padEnd(25) + `${files2.length} files`);

    // Common topics
    const commonTopics = s1Content.topics.filter(t => s2Content.topics.includes(t));
    if (commonTopics.length > 0) {
      console.log(chalk.green(`\n  ✅ Common topics: ${commonTopics.join(', ')}`));
    }

    // Unique topics
    const unique1 = s1Content.topics.filter(t => !s2Content.topics.includes(t));
    const unique2 = s2Content.topics.filter(t => !s1Content.topics.includes(t));
    
    if (unique1.length > 0) {
      console.log(chalk.yellow(`\n  📌 Unique to ${skill1.name}: ${unique1.slice(0, 3).join(', ')}${unique1.length > 3 ? '...' : ''}`));
    }
    if (unique2.length > 0) {
      console.log(chalk.magenta(`\n  📌 Unique to ${skill2.name}: ${unique2.slice(0, 3).join(', ')}${unique2.length > 3 ? '...' : ''}`));
    }

    console.log(chalk.blue(`\n${'═'.repeat(60)}\n`));
  }

  findSkill(name) {
    const categories = fs.readdirSync(this.skillsDir);
    
    for (const category of categories) {
      const categoryPath = path.join(this.skillsDir, category);
      if (!fs.statSync(categoryPath).isDirectory()) continue;
      
      const skillPath = path.join(categoryPath, name);
      if (fs.existsSync(skillPath) && fs.statSync(skillPath).isDirectory()) {
        return { name, category, path: skillPath };
      }
    }
    
    return null;
  }

  getSkillContent(skill) {
    const skillFile = path.join(skill.path, 'SKILL.md');
    const content = fs.readFileSync(skillFile, 'utf8');
    
    const priorityMatch = content.match(/\*\*Priority:\*\* (\d+)/);
    const topicMatches = content.match(/- (.+)/g) || [];
    
    return {
      priority: priorityMatch ? parseInt(priorityMatch[1]) : 50,
      topics: topicMatches.map(t => t.replace('- ', '').trim())
    };
  }

  getSkillFiles(skill) {
    const files = [];
    const walk = (dir) => {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
          walk(fullPath);
        } else {
          files.push(fullPath);
        }
      }
    };
    walk(skill.path);
    return files;
  }
}

module.exports = SkillComparer;
