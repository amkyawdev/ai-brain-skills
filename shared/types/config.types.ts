// Config Types

export interface SkillConfig {
  version: string;
  skills: Record<string, SkillDefinition>;
  autoLoadCategories: string[];
}

export interface SkillDefinition {
  description: string;
  autoLoad: boolean;
  priority: number;
  categories: string[];
}

export interface PriorityRule {
  name: string;
  description: string;
  conditions: Record<string, any>;
  priority: number;
}

export interface ContextRule {
  trigger: string;
  loadSkills: string[];
}

export interface PerformanceRules {
  maxSkillsLoaded: number;
  maxReferencesPerSkill: number;
  cacheEnabled: boolean;
  lazyLoadReferences: boolean;
  parallelLoading: boolean;
}
