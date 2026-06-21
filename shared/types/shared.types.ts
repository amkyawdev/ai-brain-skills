// Shared Types

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: string[];
}

export interface CommonPattern {
  name: string;
  description: string;
  examples: string[];
  tags: string[];
}
