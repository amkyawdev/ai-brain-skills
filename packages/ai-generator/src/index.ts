import { OpenAI } from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import { SkillSchema, SkillTemplate } from './types';
import { skillPromptTemplate } from './templates/skill-prompt';

export class AISkillGenerator {
  private client: OpenAI;
  private skillsDir: string;

  constructor(apiKey: string, skillsDir: string) {
    this.client = new OpenAI({ apiKey });
    this.skillsDir = skillsDir;
  }

  async generateSkill(request: SkillGenerationRequest): Promise<GeneratedSkill> {
    console.log(`\n🤖 AI generating skill: ${request.name}...\n`);

    // Analyze existing skills for context
    const similarSkills = await this.findSimilarSkills(request.domain);

    // Generate skill content using AI
    const skillContent = await this.callAI(request, similarSkills);

    // Parse and validate
    const validatedSkill = this.parseAndValidate(skillContent);

    return {
      ...validatedSkill,
      name: request.name,
      category: request.category,
      generated: true,
      confidence: 0.85
    };
  }

  async analyzeCodebase(dirPath: string): Promise<CodeAnalysis> {
    console.log('\n🔍 Analyzing codebase...\n');

    const files = this.collectFiles(dirPath);
    const analysis: CodeAnalysis = {
      languages: new Set(),
      frameworks: new Set(),
      patterns: [],
      fileCount: files.length
    };

    for (const file of files) {
      const ext = path.extname(file);
      analysis.languages.add(this.getLanguage(ext));

      const content = fs.readFileSync(file, 'utf8');
      const detected = this.detectPatterns(content, ext);
      analysis.patterns.push(...detected);
    }

    return {
      ...analysis,
      languages: Array.from(analysis.languages),
      frameworks: Array.from(analysis.frameworks)
    };
  }

  private async callAI(request: SkillGenerationRequest, context: string[]): Promise<string> {
    const prompt = skillPromptTemplate
      .replace('{{SKILL_NAME}}', request.name)
      .replace('{{DOMAIN}}', request.domain)
      .replace('{{CONTEXT}}', context.join('\n'))
      .replace('{{TOPICS}}', request.topics?.join(', ') || '');

    const response = await this.client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert software architect specializing in creating skill documentation.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    return response.choices[0].message.content || '';
  }

  private findSimilarSkills(domain: string): string[] {
    const similar: string[] = [];
    const domainPath = path.join(this.skillsDir, domain);

    if (fs.existsSync(domainPath)) {
      const skills = fs.readdirSync(domainPath);
      skills.slice(0, 3).forEach(skill => {
        const skillFile = path.join(domainPath, skill, 'SKILL.md');
        if (fs.existsSync(skillFile)) {
          similar.push(fs.readFileSync(skillFile, 'utf8').substring(0, 500));
        }
      });
    }

    return similar;
  }

  private collectFiles(dir: string, extensions: string[] = ['.js', '.ts', '.py', '.go', '.rs']): string[] {
    const files: string[] = [];

    const walk = (d: string) => {
      const items = fs.readdirSync(d);
      for (const item of items) {
        if (item === 'node_modules' || item === '.git') continue;
        const fullPath = path.join(d, item);
        if (fs.statSync(fullPath).isDirectory()) {
          walk(fullPath);
        } else if (extensions.some(ext => item.endsWith(ext))) {
          files.push(fullPath);
        }
      }
    };

    walk(dir);
    return files;
  }

  private getLanguage(ext: string): string {
    const map: Record<string, string> = {
      '.js': 'JavaScript',
      '.ts': 'TypeScript',
      '.py': 'Python',
      '.go': 'Go',
      '.rs': 'Rust',
      '.java': 'Java',
      '.rb': 'Ruby'
    };
    return map[ext] || 'Unknown';
  }

  private detectPatterns(content: string, ext: string): string[] {
    const patterns: string[] = [];

    if (content.includes('useState') || content.includes('useEffect')) {
      patterns.push('React Hooks');
    }
    if (content.includes('async') && content.includes('await')) {
      patterns.push('Async/Await');
    }
    if (content.includes('class ') && content.includes('extends')) {
      patterns.push('OOP');
    }
    if (content.includes('@')) {
      patterns.push('Decorator');
    }

    return patterns;
  }

  private parseAndValidate(content: string): Partial<GeneratedSkill> {
    return {
      overview: this.extractSection(content, 'Overview'),
      topics: this.extractList(content, 'Topics'),
      usage: this.extractSection(content, 'Usage'),
      examples: this.extractSection(content, 'Examples'),
      references: this.extractList(content, 'References')
    };
  }

  private extractSection(content: string, section: string): string {
    const regex = new RegExp(`##\\s*${section}[\\s\\S]*?(?=##|$)`, 'i');
    const match = content.match(regex);
    return match ? match[0].replace(`## ${section}`, '').trim() : '';
  }

  private extractList(content: string, section: string): string[] {
    const sectionContent = this.extractSection(content, section);
    const items = sectionContent.match(/^- (.+)$/gm) || [];
    return items.map(item => item.replace(/^- /, '').trim());
  }
}

export interface SkillGenerationRequest {
  name: string;
  domain: string;
  category?: string;
  topics?: string[];
  description?: string;
}

export interface GeneratedSkill {
  name: string;
  category: string;
  overview: string;
  topics: string[];
  usage: string;
  examples: string;
  references: string[];
  generated: boolean;
  confidence: number;
}

export interface CodeAnalysis {
  languages: string[];
  frameworks: string[];
  patterns: string[];
  fileCount: number;
}
