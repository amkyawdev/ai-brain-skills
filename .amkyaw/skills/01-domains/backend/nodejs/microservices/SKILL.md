# Microservices Skill

**Category:** Domain - Backend  
**Priority:** 70

## Overview

Patterns and best practices for microservices architecture.

## Key Topics

- Service decomposition
- Inter-service communication
- API Gateway
- Service discovery
- Circuit breakers
- Event-driven architecture

## Communication Patterns

### Synchronous (REST/gRPC)
```javascript
// HTTP call
const response = await fetch('http://service-name/api/data');
```

### Asynchronous (Message Queue)
```javascript
// Publish event
channel.publish('events', Buffer.from(JSON.stringify(event)));

// Consume event
channel.consume('events', (msg) => {
  const event = JSON.parse(msg.content);
  processEvent(event);
});
```

## Service Discovery

Use a service registry (Consul, Eureka) or use Kubernetes DNS.

## Circuit Breaker Pattern

```javascript
const CircuitBreaker = require('opossum');

const breaker = new CircuitBreaker(callExternalService);
breaker.fallback(() => 'Fallback response');

breaker.fire(params).then(console.log).catch(console.error);
```

## Best Practices

1. Design for failure
2. Use idempotent operations
3. Implement health checks
4. Use distributed tracing
5. Centralize logging and monitoring
