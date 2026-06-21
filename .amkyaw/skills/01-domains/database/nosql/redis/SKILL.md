# Redis Skill

**Category:** Domain - Database  
**Priority:** 70

## Overview

Expert knowledge for Redis development.

## Key Topics

- Data structures (strings, lists, sets, hashes)
- Caching patterns
- Pub/Sub
- Transactions
- Lua scripting
- Cluster mode

## Usage

```javascript
// Strings
await redis.set('key', 'value');
await redis.get('key');

// Hashes
await redis.hset('user:1', { name: 'John', email: 'john@example.com' });
const user = await redis.hgetall('user:1');

// Lists
await redis.lpush('queue', 'task1', 'task2');
const task = await redis.rpop('queue');

// Caching
const cached = await redis.get(`user:${userId}`);
if (cached) return JSON.parse(cached);
const user = await db.getUser(userId);
await redis.setex(`user:${userId}`, 3600, JSON.stringify(user));
return user;
```
