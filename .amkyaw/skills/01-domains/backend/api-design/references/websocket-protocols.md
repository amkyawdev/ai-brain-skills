# WebSocket Protocols

## Connection Lifecycle

```
Client                    Server
   |                         |
   |--- CONNECT ------------>| Establish connection
   |<-- CONNACK -------------| Connection accepted
   |                         |
   |<--> DATA MESSAGES ----->| Bidirectional data
   |                         |
   |--- DISCONNECT --------->| Client closes
   |<-- DISCONNECT --------->| Server closes
```

## Message Format

```json
{
  "type": "message_type",
  "payload": { ... },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Common Patterns

### Broadcasting

```javascript
class BroadcastChannel {
  constructor() {
    this.clients = new Set();
  }
  
  add(client) {
    this.clients.add(client);
  }
  
  remove(client) {
    this.clients.delete(client);
  }
  
  broadcast(message) {
    for (const client of this.clients) {
      client.send(JSON.stringify(message));
    }
  }
}
```

### Heartbeat

```javascript
// Client
setInterval(() => {
  ws.send(JSON.stringify({ type: 'ping' }));
}, 30000);

// Server
ws.on('message', (msg) => {
  if (JSON.parse(msg).type === 'ping') {
    ws.send(JSON.stringify({ type: 'pong' }));
  }
});
```

### Reconnection

```javascript
function connect() {
  ws = new WebSocket(url);
  
  ws.onclose = () => {
    setTimeout(connect, 1000 * Math.pow(2, retryCount));
    retryCount++;
  };
}
```

## Best Practices

1. Implement heartbeat/ping-pong
2. Handle reconnection gracefully
3. Use message framing
4. Implement backpressure
5. Secure with WSS (TLS)
