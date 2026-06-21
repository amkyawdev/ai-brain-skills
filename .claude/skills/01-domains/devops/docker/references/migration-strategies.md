# Docker Migration Strategies

## Blue-Green Deployment

```yaml
version: '3.8'
services:
  app-blue:
    image: myapp:v1
    networks:
      - proxy
  
  app-green:
    image: myapp:v2
    networks:
      - proxy
    deploy:
      mode: replicated
      replicas: 0

  proxy:
    image: nginx
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
```

## Rolling Updates

```bash
# Update service with rolling update
docker service update --image myapp:v2 myapp

# Set update parallelism
docker service update --update-parallelism 2 myapp

# Set failure action
docker service update --update-failure-action rollback myapp
```

## Health Checks

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/health || exit 1
```

## Backup Strategy

```bash
# Backup volume
docker run --rm -v volume-name:/data -v $(pwd):/backup alpine \
  tar czf /backup/backup.tar.gz -C /data .

# Restore volume
docker run --rm -v volume-name:/data -v $(pwd):/backup alpine \
  tar xzf /backup/backup.tar.gz -C /data
```
