const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

class SkillExplorer {
  constructor(rootPath) {
    this.rootPath = rootPath;
    this.skillsDir = path.join(rootPath, '.amkyaw', 'skills');
  }

  async explore(name) {
    if (!name) {
      name = await this.selectSkill();
      if (!name) {
        console.log(chalk.yellow('No skill selected.'));
        return;
      }
    }

    const skill = this.findSkill(name);
    if (!skill) {
      console.log(chalk.red(`\n❌ Skill "${name}" not found!\n`));
      return;
    }

    this.displaySkillDetails(skill);
    
    const action = await this.promptAction(skill);
    await this.handleAction(action, skill);
  }

  async selectSkill() {
    const skills = this.collectAllSkills();
    
    const choices = skills.map(s => ({
      name: `${s.name} (${s.category})`,
      value: s.name
    }));

    const { skillName } = await inquirer.prompt([
      {
        type: 'list',
        name: 'skillName',
        message: 'Select a skill to explore:',
        choices
      }
    ]);

    return skillName;
  }

  collectAllSkills() {
    const skills = [];
    const categories = fs.readdirSync(this.skillsDir);
    
    for (const category of categories) {
      const categoryPath = path.join(this.skillsDir, category);
      if (!fs.statSync(categoryPath).isDirectory()) continue;
      
      const skillDirs = fs.readdirSync(categoryPath);
      for (const skillDir of skillDirs) {
        const skillPath = path.join(categoryPath, skillDir);
        if (fs.statSync(skillPath).isDirectory()) {
          skills.push({ name: skillDir, category, path: skillPath });
        }
      }
    }
    
    return skills;
  }

  findSkill(name) {
    const skills = this.collectAllSkills();
    return skills.find(s => s.name === name);
  }

  displaySkillDetails(skill) {
    const skillFile = path.join(skill.path, 'SKILL.md');
    const content = fs.readFileSync(skillFile, 'utf8');
    
    console.log(chalk.blue(`\n${'═'.repeat(60)}`));
    console.log(chalk.bold.cyan(`  ${skill.name}`));
    console.log(chalk.blue('═'.repeat(60)));
    
    // Extract and display sections
    const sections = content.split('\n## ');
    console.log(chalk.gray(`Category: ${skill.category}\n`));
    
    sections.forEach(section => {
      const lines = section.split('\n');
      const title = lines[0].replace(/^#+\s*/, '');
      if (title !== skill.name) {
        console.log(chalk.cyan(`\n## ${title}`));
        console.log(chalk.gray(lines.slice(1, 6).join(' ')));
      }
    });
  }

  async promptAction(skill) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          { name: '📄 View full content', value: 'view' },
          { name: '📂 Open in explorer', value: 'open' },
          { name: '📋 Copy path', value: 'copy' },
          { name: '🔗 Related skills', value: 'related' },
          { name: '❌ Exit', value: 'exit' }
        ]
      }
    ]);
    return action;
  }

  async handleAction(action, skill) {
    switch (action) {
      case 'view':
        const content = fs.readFileSync(path.join(skill.path, 'SKILL.md'), 'utf8');
        console.log(chalk.white(`\n${content}\n`));
        break;
      case 'open':
        console.log(chalk.green(`\n📂 ${skill.path}\n`));
        break;
      case 'copy':
        console.log(chalk.green(`\n📋 Copied: ${skill.path}\n`));
        break;
      case 'exit':
        console.log(chalk.gray('\nGoodbye!\n'));
        break;
    }
  }
}

module.exports = SkillExplorer;
