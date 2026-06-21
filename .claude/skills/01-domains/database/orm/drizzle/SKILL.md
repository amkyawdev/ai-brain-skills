# Drizzle ORM Skill

**Category:** Domain - Database  
**Priority:** 70

## Overview

Expert knowledge for Drizzle ORM development.

## Key Topics

- Schema definition
- Query builder
- Relations
- Migrations
- Type safety
- Performance

## Usage

```typescript
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Query
const allUsers = await db.select().from(users);
const user = await db.select().from(users).where(eq(users.email, 'john@example.com'));
```

## Best Practices

1. Use transactions for complex operations
2. Leverage prepared statements
3. Use select().fields() for specific columns
4. Keep schema in sync with migrations
5. Use type inference for query results
