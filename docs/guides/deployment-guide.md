# Deployment Guide

## Deployment Steps

1. **Validate** skills
```bash
npm run validate
```

2. **Build** the skills
```bash
npm run build
```

3. **Deploy** to target
```bash
npm run deploy
```

## CI/CD

GitHub Actions handle automatic:
- Validation on PR
- Performance tests
- Security scans
- Deployment on release

## Rollback

If deployment fails:

```bash
npm run rollback
```
