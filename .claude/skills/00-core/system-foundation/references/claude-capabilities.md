# Claude Capabilities Reference

## Available Tools

### File Operations
- `file_editor`: View, create, and edit files
- `terminal`: Execute shell commands

### Web Interaction
- `browser_navigate`: Navigate to URLs
- `browser_click`: Interact with web elements
- `browser_type`: Enter text into forms
- `browser_get_content`: Extract page content
- `tavily_*`: Web search and extraction

### Task Management
- `task`: Launch subagents for complex tasks
- `task_tracker`: Track development tasks
- `think`: Log reasoning and analysis

### External Services
- `github`: GitHub API interactions
- `create_pr`: Create pull requests
- `invoke_skill`: Load and use skills

## Limitations

- Cannot browse to sites with CAPTCHAs or login walls
- Maximum 10 browser actions per sub-task
- Some commands may timeout after 30 seconds

## Best Practices

1. Prefer simple tools (curl/wget) over browser when possible
2. Use subagents for complex multi-step tasks
3. Reset terminal if it becomes unresponsive
4. Use `think` for complex reasoning before implementation
