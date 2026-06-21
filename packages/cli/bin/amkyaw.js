#!/usr/bin/env node

/**
 * AI Brain Skills CLI
 * Interactive command-line tool for managing skills
 */

const { Command } = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const program = new Command();

program
  .name('amkyaw')
  .description('AI Brain Skills CLI - Manage your skill framework')
  .version('1.0.0');

// Skill Create Command
program
  .command('skill:create')
  .description('Create a new skill')
  .argument('<name>', 'Skill name (e.g., react, fastapi)')
  .option('-c, --category <category>', 'Skill category', 'custom')
  .option('-p, --priority <priority>', 'Skill priority', '70')
  .action(async (name, options) => {
    const SkillCreator = require('../lib/skill-creator');
    const creator = new SkillCreator(path.join(__dirname, '../../..'));
    await creator.create(name, options);
  });

// Skill List Command
program
  .command('skill:list')
  .description('List all available skills')
  .option('-c, --category <category>', 'Filter by category')
  .option('-f, --format <format>', 'Output format (table, json)', 'table')
  .action(async (options) => {
    const SkillLister = require('../lib/skill-lister');
    const lister = new SkillLister(path.join(__dirname, '../../..'));
    await lister.list(options);
  });

// Skill Search Command
program
  .command('skill:search')
  .description('Search skills by name or topic')
  .argument('<query>', 'Search query')
  .action(async (query) => {
    const SkillSearcher = require('../lib/skill-searcher');
    const searcher = new SkillSearcher(path.join(__dirname, '../../..'));
    await searcher.search(query);
  });

// Skill Explore Command
program
  .command('skill:explore')
  .description('Interactive skill explorer')
  .argument('[name]', 'Skill name to explore')
  .action(async (name) => {
    const SkillExplorer = require('../lib/skill-explorer');
    const explorer = new SkillExplorer(path.join(__dirname, '../../..'));
    await explorer.explore(name);
  });

// Skill Compare Command
program
  .command('skill:compare')
  .description('Compare two skills')
  .argument('<skill1>', 'First skill')
  .argument('<skill2>', 'Second skill')
  .action(async (skill1, skill2) => {
    const SkillComparer = require('../lib/skill-comparer');
    const comparer = new SkillComparer(path.join(__dirname, '../../..'));
    await comparer.compare(skill1, skill2);
  });

// Validate Command
program
  .command('validate')
  .description('Validate all skills')
  .action(async () => {
    const Validator = require('../lib/validator');
    const validator = new Validator(path.join(__dirname, '../../..'));
    await validator.validateAll();
  });

// Build Command
program
  .command('build')
  .description('Build skills for deployment')
  .option('-o, --output <dir>', 'Output directory', './dist')
  .action(async (options) => {
    const Builder = require('../lib/builder');
    const builder = new Builder(path.join(__dirname, '../../..'));
    await builder.build(options.output);
  });

// Init Command
program
  .command('init')
  .description('Initialize AI Brain Skills in a project')
  .action(async () => {
    const Initializer = require('../lib/initializer');
    const init = new Initializer(process.cwd());
    await init.run();
  });

program.parse();
