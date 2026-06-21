import React from 'react';
import { TrendingUp } from 'lucide-react';

interface TopSkill {
  name: string;
  category: string;
  priority: number;
  uses: number;
}

interface TopSkillsProps {
  skills: TopSkill[];
}

export default function TopSkills({ skills }: TopSkillsProps) {
  return (
    <div className="top-skills-list">
      {skills.map((skill, index) => (
        <div key={skill.name} className="skill-item">
          <div className="skill-rank">{index + 1}</div>
          <div className="skill-info">
            <div className="skill-name">{skill.name}</div>
            <div className="skill-category">{skill.category}</div>
          </div>
          <div className="skill-stats">
            <span className="skill-priority">
              <TrendingUp size={14} /> {skill.priority}
            </span>
            <span className="skill-uses">{skill.uses} uses</span>
          </div>
        </div>
      ))}
    </div>
  );
}
