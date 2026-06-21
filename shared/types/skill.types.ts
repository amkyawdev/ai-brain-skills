// Skill Types

export interface Skill {
  name: string;
  path: string;
  category: string;
  priority: number;
  autoLoad: boolean;
  tags: string[];
  description?: string;
}

export interface SkillReference {
  name: string;
  path: string;
  type: 'markdown' | 'script' | 'template';
}

export interface SkillMetadata {
  version: string;
  author?: string;
  dependencies?: string[];
  examples?: string[];
}

export interface SkillContext {
  skill: Skill;
  references: SkillReference[];
  metadata: SkillMetadata;
}
