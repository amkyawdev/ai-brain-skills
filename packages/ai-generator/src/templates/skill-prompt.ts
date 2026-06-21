export const skillPromptTemplate = `Generate a comprehensive skill documentation for:

**Skill Name:** {{SKILL_NAME}}
**Domain:** {{DOMAIN}}
**Topics:** {{TOPICS}}

Context from similar skills:
{{CONTEXT}}

Please generate a SKILL.md with:
1. ## Overview - What this skill does
2. ## Key Topics - Bullet list of topics
3. ## Usage - How to use this skill
4. ## Examples - Code examples
5. ## References - Related documentation

Format in proper Markdown.
`;
