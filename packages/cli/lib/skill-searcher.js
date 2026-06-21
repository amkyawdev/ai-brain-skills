const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

class SkillSearcher {
  constructor(rootPath) {
    this.rootPath = rootPath;
    this.skillsDir = path.join(rootPath, '.amkyaw', 'skills');
  }

  async search(query) {
    const queryLower = query.toLowerCase();
    const results = [];
    
    const searchInFile = (filePath, fileName) => {
      const content = fs.readFileSync(filePath, 'utf8').toLowerCase();
      const matches = [];
      
      // Check name match
      if (fileName.toLowerCase().includes(queryLower)) {
        matches.push({ type: 'name', score: 100 });
      }
      
      // Check content matches
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.toLowerCase().includes(queryLower)) {
          matches.push({ type: 'content', line: index + 1, score: 50 });
        }
      });
      
      return matches.length > 0 ? { file: filePath, matches } : null;
    };

    const walkDir = (dir) => {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
          walkDir(fullPath);
        } else if (file.endsWith('.md')) {
          const result = searchInFile(fullPath, file);
          if (result) results.push(result);
        }
      }
    };

    walkDir(this.skillsDir);

    if (results.length === 0) {
      console.log(chalk.yellow(`\n🔍 No results found for "${query}"\n`));
      return;
    }

    console.log(chalk.blue(`\n🔍 Found ${results.length} results for "${query}":\n`));
    
    results.forEach((result, index) => {
      const relativePath = path.relative(this.skillsDir, result.file);
      console.log(chalk.cyan(`${index + 1}. ${relativePath}`));
      result.matches.slice(0, 3).forEach(match => {
        if (match.type === 'name') {
          console.log(chalk.gray(`   📌 Match: ${chalk.green(match.type)} (score: ${match.score})`));
        } else {
          console.log(chalk.gray(`   📄 Line ${match.line} (score: ${match.score})`));
        }
      });
    });
    console.log();
  }
}

module.exports = SkillSearcher;
