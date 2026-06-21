# Security Best Practices

## Content Scanning

All skill content is scanned for:
- Exposed credentials
- Security vulnerabilities
- Malicious patterns

## Secrets

Never commit secrets:
- Use environment variables
- Use secret management tools
- Rotate credentials regularly

## Access Control

Configure restricted paths:

```json
{
  "restrictedPaths": [
    "~/.ssh",
    "~/.aws"
  ]
}
```
