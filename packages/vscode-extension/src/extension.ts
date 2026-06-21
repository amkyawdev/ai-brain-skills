import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

let skillsTreeDataProvider: SkillsTreeDataProvider;

export function activate(context: vscode.ExtensionContext) {
  const rootPath = vscode.workspace.rootPath || '';
  const skillsDir = path.join(rootPath, '.amkyaw', 'skills');
  
  // Register tree view provider
  skillsTreeDataProvider = new SkillsTreeDataProvider(skillsDir);
  vscode.window.registerTreeDataProvider('amkyawSkills', skillsTreeDataProvider);
  
  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand('amkyaw.skillList', async () => {
      const skills = await getAllSkills(skillsDir);
      const items = skills.map(s => ({
        label: s.name,
        description: s.category,
        detail: `Priority: ${s.priority}`
      }));
      
      const selected = await vscode.window.showQuickPick(items, {
        matchOnDescription: true,
        placeHolder: 'Select a skill'
      });
      
      if (selected) {
        vscode.commands.executeCommand('amkyaw.skillOpen', selected.label);
      }
    })
  );
  
  context.subscriptions.push(
    vscode.commands.registerCommand('amkyaw.skillSearch', async () => {
      const query = await vscode.window.showInputBox({
        prompt: 'Search skills',
        placeHolder: 'Enter skill name or topic'
      });
      
      if (query) {
        const skills = await searchSkills(skillsDir, query);
        if (skills.length > 0) {
          vscode.window.showInformationMessage(`Found ${skills.length} skill(s)`);
          skillsTreeDataProvider.refresh();
        } else {
          vscode.window.showInformationMessage('No skills found');
        }
      }
    })
  );
  
  context.subscriptions.push(
    vscode.commands.registerCommand('amkyaw.skillCreate', async () => {
      const name = await vscode.window.showInputBox({
        prompt: 'Skill name',
        placeHolder: 'e.g., my-awesome-skill'
      });
      
      if (name) {
        const category = await vscode.window.showQuickPick([
          { label: '00-core', description: 'Core infrastructure' },
          { label: '01-domains', description: 'Domain specific' },
          { label: '04-custom', description: 'Custom skills' }
        ], { placeHolder: 'Select category' });
        
        if (category) {
          await createSkill(skillsDir, name, category.label);
          vscode.window.showInformationMessage(`Skill "${name}" created!`);
          skillsTreeDataProvider.refresh();
        }
      }
    })
  );
  
  context.subscriptions.push(
    vscode.commands.registerCommand('amkyaw.skillOpen', async (skillName: string) => {
      const skillPath = findSkillPath(skillsDir, skillName);
      if (skillPath) {
        const skillFile = path.join(skillPath, 'SKILL.md');
        const doc = await vscode.workspace.openTextDocument(skillFile);
        await vscode.window.showTextDocument(doc);
      }
    })
  );
  
  // Update status bar
  const statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  statusBar.text = '$(brain) AI Brain Skills';
  statusBar.command = 'amkyaw.skillList';
  statusBar.show();
  context.subscriptions.push(statusBar);
}

async function getAllSkills(skillsDir: string): Promise<Skill[]> {
  const skills: Skill[] = [];
  
  if (!fs.existsSync(skillsDir)) return skills;
  
  const categories = fs.readdirSync(skillsDir);
  for (const category of categories) {
    const categoryPath = path.join(skillsDir, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;
    
    const skillDirs = fs.readdirSync(categoryPath);
    for (const skillDir of skillDirs) {
      const skillPath = path.join(categoryPath, skillDir);
      if (!fs.statSync(skillPath).isDirectory()) continue;
      
      const skillFile = path.join(skillPath, 'SKILL.md');
      if (fs.existsSync(skillFile)) {
        const content = fs.readFileSync(skillFile, 'utf8');
        const priority = extractPriority(content);
        skills.push({
          name: skillDir,
          category,
          path: skillPath,
          priority
        });
      }
    }
  }
  
  return skills.sort((a, b) => b.priority - a.priority);
}

async function searchSkills(skillsDir: string, query: string): Promise<Skill[]> {
  const allSkills = await getAllSkills(skillsDir);
  const queryLower = query.toLowerCase();
  
  return allSkills.filter(s => 
    s.name.toLowerCase().includes(queryLower) ||
    s.category.toLowerCase().includes(queryLower)
  );
}

function findSkillPath(skillsDir: string, skillName: string): string | null {
  if (!fs.existsSync(skillsDir)) return null;
  
  const categories = fs.readdirSync(skillsDir);
  for (const category of categories) {
    const skillPath = path.join(skillsDir, category, skillName);
    if (fs.existsSync(skillPath)) {
      return skillPath;
    }
  }
  return null;
}

async function createSkill(skillsDir: string, name: string, category: string): Promise<void> {
  const skillPath = path.join(skillsDir, category, name);
  fs.mkdirSync(skillPath, { recursive: true });
  fs.mkdirSync(path.join(skillPath, 'references'), { recursive: true });
  fs.mkdirSync(path.join(skillPath, 'scripts'), { recursive: true });
  
  const content = `# ${name}

**Category:** ${category}  
**Priority:** 70
**Created:** ${new Date().toISOString().split('T')[0]}

## Overview

Describe this skill...

## Key Topics

- Topic 1
- Topic 2
`;
  
  fs.writeFileSync(path.join(skillPath, 'SKILL.md'), content);
}

function extractPriority(content: string): number {
  const match = content.match(/\*\*Priority:\*\* (\d+)/);
  return match ? parseInt(match[1]) : 50;
}

interface Skill {
  name: string;
  category: string;
  path: string;
  priority: number;
}

class SkillsTreeDataProvider implements vscode.TreeDataProvider<SkillTreeItem> {
  constructor(private skillsDir: string) {}
  
  getTreeItem(element: SkillTreeItem): vscode.TreeItem {
    return element;
  }
  
  async getChildren(element?: SkillTreeItem): Promise<SkillTreeItem[]> {
    if (!element) {
      const categories = await this.getCategories();
      return categories;
    }
    
    if (element.contextValue === 'category') {
      const skills = await this.getSkillsInCategory(element.label!);
      return skills;
    }
    
    return [];
  }
  
  private async getCategories(): Promise<SkillTreeItem[]> {
    if (!fs.existsSync(this.skillsDir)) return [];
    
    const categories = fs.readdirSync(this.skillsDir)
      .filter(f => fs.statSync(path.join(this.skillsDir, f)).isDirectory());
    
    return categories.map(cat => new SkillTreeItem(
      cat,
      vscode.TreeItemCollapsibleState.Expanded,
      'category',
      { command: 'amkyaw.skillSearch', title: 'Search' }
    ));
  }
  
  private async getSkillsInCategory(category: string): Promise<SkillTreeItem[]> {
    const categoryPath = path.join(this.skillsDir, category);
    if (!fs.existsSync(categoryPath)) return [];
    
    const skills = fs.readdirSync(categoryPath)
      .filter(f => fs.statSync(path.join(categoryPath, f)).isDirectory());
    
    return skills.map(skill => new SkillTreeItem(
      skill,
      vscode.TreeItemCollapsibleState.None,
      'skill',
      { command: 'amkyaw.skillOpen', title: 'Open', arguments: [skill] }
    ));
  }
  
  refresh(): void {
    vscode.commands.executeCommand('amkyawSkills.refresh');
  }
}

class SkillTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly contextValue: string,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
  }
}

export function deactivate() {}
