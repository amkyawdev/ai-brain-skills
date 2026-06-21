import { z } from 'zod';

export const SkillSchema = z.object({
  name: z.string().min(1),
  category: z.enum(['00-core', '01-domains', '04-custom']),
  priority: z.number().min(0).max(100).default(70),
  overview: z.string(),
  topics: z.array(z.string()),
  usage: z.string().optional(),
  examples: z.string().optional(),
  references: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  relatedSkills: z.array(z.string()).optional()
});

export interface SkillTemplate {
  name: string;
  category: string;
  priority: number;
  overview: string;
  topics: string[];
  usage?: string;
  examples?: string;
  references?: string[];
  tags?: string[];
  relatedSkills?: string[];
}

export interface SkillMetadata {
  version: string;
  created: string;
  updated: string;
  author?: string;
  deprecated?: boolean;
  deprecationMessage?: string;
}
