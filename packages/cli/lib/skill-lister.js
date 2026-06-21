const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

class SkillLister {
  constructor(rootPath) {
    this.rootPath = rootPath;
    this.skillsDir = path.join(rootPath, '.amkyaw', 'skills');
  }

  async list(options) {
    const skills = this.collectSkills();
    
    if (options.category) {
      const filtered = skills.filter(s => s.category === options.category);
      this.displaySkills(filtered, options.format);
    } else {
      this.displaySkills(skills, options.format);
    }
  }

  collectSkills() {
    const skills = [];
    
    const categories = fs.readdirSync(this.skillsDir);
    
    for (const category of categories) {
      const categoryPath = path.join(this.skillsDir, category);
      if (!fs.statSync(categoryPath).isDirectory()) continue;
      
      const skillDirs = fs.readdirSync(categoryPath);
      
      for (const skillDir of skillDirs) {
        const skillPath = path.join(categoryPath, skillDir);
        if (!fs.statSync(skillPath).isDirectory()) continue;
        
        const skillFile = path.join(skillPath, 'SKILL.md');
        if (fs.existsSync(skillFile)) {
          const content = fs.readFileSync(skillFile, 'utf8');
          const title = this.extractTitle(content);
          const priority = this.extractPriority(content);
          
          skills.push({
            name: skillDir,
            category,
            title,
            priority,
            path: skillPath
          });
        }
      }
    }
    
    return skills.sort((a, b) => b.priority - a.priority);
  }

  extractTitle(content) {
    const match = content.match(/^# (.+)$/m);
    return match ? match[1] : 'Untitled';
  }

  extractPriority(content) {
    const match = content.match(/\*\*Priority:\*\* (\d+)/);
    return match ? parseInt(match[1]) : 50;
  }

  displaySkills(skills, format) {
    if (skills.length === 0) {
      console.log(chalk.yellow('No skills found.'));
      return;
    }

    if (format === 'json') {
      console.log(JSON.stringify(skills, null, 2));
    } else {
      console.log(chalk.blue(`\n📚 Found ${skills.length} skills:\n`));
      
      // Group by category
      const grouped = {};
      skills.forEach(skill => {
        if (!grouped[skill.category]) grouped[skill.category] = [];
        grouped[skill.category].push(skill);
      });

      for (const [category, categorySkills] of Object.entries(grouped)) {
        console.log(chalk.cyan(`\n${category} (${categorySkills.length})`));
        console.log(chalk.gray('─'.repeat(50)));
        
        for (const skill of categorySkills) {
          const priorityBar = '█'.repeat(Math.floor(skill.priority / 10)) + '░'.repeat(10 - Math.floor(skill.priority / 10));
          console.log(`  ${chalk.green(skill.name.padEnd(25))} ${chalk.gray(priorityBar)} ${skill.priority}`);
        }
      }
      console.log();
    }
  }
}

module.exports = SkillLister;
