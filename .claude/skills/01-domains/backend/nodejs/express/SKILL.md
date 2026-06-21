# Express.js Skill

**Category:** Domain - Backend  
**Priority:** 75

## Overview

Expert knowledge for Express.js application development.

## Key Topics

- Middleware
- Routing
- Request/response handling
- Error handling
- Authentication
- API design

## Usage

```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/api/items', async (req, res) => {
  const items = await db.getItems();
  res.json(items);
});

app.post('/api/items', async (req, res) => {
  const item = await db.createItem(req.body);
  res.status(201).json(item);
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(3000);
```

## Best Practices

1. Use middleware for cross-cutting concerns
2. Implement proper error handling
3. Validate input with libraries like Joi or Zod
4. Use async/await for async operations
5. Consider TypeScript for type safety
