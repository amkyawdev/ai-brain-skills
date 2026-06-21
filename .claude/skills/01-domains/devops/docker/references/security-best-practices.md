# Docker Security Best Practices

## Image Security

1. Use minimal base images
2. Scan for vulnerabilities
3. Sign images with Docker Content Trust
4. Use specific version tags

## Runtime Security

```dockerfile
# Create user
RUN groupadd -r appgroup && useradd -r -g appgroup appuser
USER appuser

# Read-only filesystem
docker run --read-only

# No privileged mode
docker run --privileged=false
```

## Secrets Management

```yaml
# docker-compose.yml
services:
  app:
    build: .
    secrets:
      - db_password

secrets:
  db_password:
    file: ./secrets/db_password.txt
```

## Network Isolation

```yaml
services:
  app:
    networks:
      - frontend
      - backend
  
networks:
  frontend:
  backend:
    internal: true
```

## Scanning

```bash
# Trivy scanner
trivy image myapp:latest

# Docker scan
docker scan myapp:latest
```
