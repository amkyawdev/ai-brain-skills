const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

class Initializer {
  constructor(projectPath) {
    this.projectPath = projectPath;
  }

  async run() {
    console.log(chalk.blue('\n🚀 AI Brain Skills Initializer\n'));
    
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Initialize AI Brain Skills in this directory?',
        default: true
      }
    ]);

    if (!confirm) {
      console.log(chalk.gray('\nCancelled.\n'));
      return;
    }

    // Create .amkyaw directory structure
    const amkyawDir = path.join(this.projectPath, '.amkyaw');
    const skillsDir = path.join(amkyawDir, 'skills');
    const configDir = path.join(amkyawDir, 'config');
    
    fs.mkdirSync(skillsDir, { recursive: true });
    fs.mkdirSync(configDir, { recursive: true });
    fs.mkdirSync(path.join(skillsDir, '04-custom'), { recursive: true });

    // Create default config
    const config = {
      version: '1.0.0',
      skills: {
        autoLoad: ['00-core/*'],
        priority: {
          '00-core': 100,
          '01-domains': 80,
          '04-custom': 60
        }
      }
    };

    fs.writeFileSync(
      path.join(configDir, 'settings.json'),
      JSON.stringify(config, null, 2)
    );

    // Update .gitignore
    const gitignorePath = path.join(this.projectPath, '.gitignore');
    if (fs.existsSync(gitignorePath)) {
      const content = fs.readFileSync(gitignorePath, 'utf8');
      if (!content.includes('.amkyaw/')) {
        fs.appendFileSync(gitignorePath, '\n# AI Brain Skills\n.amkyaw/\n');
      }
    }

    console.log(chalk.green('\n✅ AI Brain Skills initialized!\n'));
    console.log(chalk.gray('Directory structure created:'));
    console.log('  .amkyaw/');
    console.log('  ├── skills/');
    console.log('  │   └── 04-custom/');
    console.log('  └── config/');
    console.log('\nNext steps:');
    console.log('  1. Run: amkyaw skill:create my-skill');
    console.log('  2. Run: amkyaw skill:list\n');
  }
}

module.exports = Initializer;
