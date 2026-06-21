# Incident Runbooks

## Runbook Template

```markdown
# Service Outage Runbook

## Symptoms
- 5xx errors on /api endpoint
- Error rate > 10%

## Diagnosis
1. Check service health: `kubectl get pods`
2. Check logs: `kubectl logs -f deployment/api`
3. Check metrics: [Grafana Dashboard]

## Remediation
1. Scale up: `kubectl scale deployment/api --replicas=5`
2. Restart pods: `kubectl rollout restart deployment/api`
3. Rollback: `kubectl rollout undo deployment/api`

## Escalation
- L2: #oncall
- L3: @sre-team
```

## Communication Template

```
🔴 INCIDENT DECLARED
Service: [Name]
Impact: [Description]
Status: Investigating
IC: [Name]
ETA: [Time]
Updates: Every 15 minutes
```
