const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

class Builder {
  constructor(rootPath) {
    this.rootPath = rootPath;
    this.skillsDir = path.join(rootPath, '.amkyaw', 'skills');
  }

  async build(outputDir) {
    console.log(chalk.blue('\n🔨 Building skills...\n'));
    
    const distPath = path.join(this.rootPath, outputDir);
    if (!fs.existsSync(distPath)) {
      fs.mkdirSync(distPath, { recursive: true });
    }

    const skills = this.collectSkills();
    const manifest = { version: '1.0.0', skills: [], built: new Date().toISOString() };

    for (const skill of skills) {
      await this.buildSkill(skill, distPath);
      manifest.skills.push({ name: skill.name, category: skill.category });
      console.log(chalk.green(`  ✅ ${skill.name}`));
    }

    // Write manifest
    fs.writeFileSync(
      path.join(distPath, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );

    console.log(chalk.blue(`\n📦 Built ${skills.length} skills to ${outputDir}\n`));
  }

  collectSkills() {
    const skills = [];
    const walk = (dir, category = '') => {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
          if (item.match(/^\d+-/)) {
            walk(fullPath, item);
          } else {
            const skillFile = path.join(fullPath, 'SKILL.md');
            if (fs.existsSync(skillFile)) {
              skills.push({ name: item, path: fullPath, category });
            }
          }
        }
      }
    };
    walk(this.skillsDir);
    return skills;
  }

  async buildSkill(skill, distPath) {
    const skillDistPath = path.join(distPath, skill.category, skill.name);
    fs.mkdirSync(skillDistPath, { recursive: true });

    // Copy all files
    const copyRecursive = (src, dest) => {
      if (!fs.existsSync(src)) return;
      const items = fs.readdirSync(src);
      for (const item of items) {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);
        if (fs.statSync(srcPath).isDirectory()) {
          fs.mkdirSync(destPath, { recursive: true });
          copyRecursive(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    };

    copyRecursive(skill.path, skillDistPath);
  }
}

module.exports = Builder;
