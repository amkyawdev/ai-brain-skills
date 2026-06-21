# Error Recovery Skill

**Category:** Core Infrastructure  
**Auto-loaded:** Yes  
**Priority:** 85

## Overview

Strategies for recovering from errors and troubleshooting issues.

## Error Handling Flow

1. **Identify**: Understand the error type
2. **Assess**: Determine severity and impact
3. **Diagnose**: Find root cause
4. **Recover**: Apply fix or workaround
5. **Document**: Record for future reference

## Recovery Strategies

### Command Failures
- Check syntax and arguments
- Verify file paths exist
- Check permissions
- Review environment

### Code Errors
- Read error messages carefully
- Check recent changes
- Use debugging tools
- Simplify to isolate issue

### Network Issues
- Verify connectivity
- Check firewall/proxy settings
- Retry with exponential backoff

## Scripts

- [Auto Recover](./scripts/auto-recover.sh) - Automated recovery attempts

## Best Practices

- Always verify fixes work
- Document non-obvious solutions
- Consider edge cases
- Test recovery procedures
