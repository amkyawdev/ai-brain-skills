#!/usr/bin/env node

import { AISkillGenerator, SkillGenerationRequest } from './index';

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('❌ Please set OPENAI_API_KEY environment variable');
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const command = args[0];

  const generator = new AISkillGenerator(apiKey, './.amkyaw/skills');

  if (command === 'generate') {
    const [name, domain] = args.slice(1);
    
    if (!name || !domain) {
      console.error('Usage: amkyaw-ai generate <name> <domain>');
      process.exit(1);
    }

    const request: SkillGenerationRequest = {
      name,
      domain,
      category: '04-custom'
    };

    const skill = await generator.generateSkill(request);
    
    console.log('\n✅ Skill generated successfully!');
    console.log(JSON.stringify(skill, null, 2));
  }

  if (command === 'analyze') {
    const dir = args[1] || '.';
    const analysis = await generator.analyzeCodebase(dir);
    
    console.log('\n📊 Codebase Analysis:');
    console.log(JSON.stringify(analysis, null, 2));
  }
}

main();
