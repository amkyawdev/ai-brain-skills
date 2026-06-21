# Prisma Skill

**Category:** Domain - Database  
**Priority:** 75

## Overview

Expert knowledge for Prisma ORM development.

## Key Topics

- Schema definition
- Query methods
- Relations
- Migrations
- Client API
- Type safety

## Usage

```prisma
// schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
}
```

```typescript
// Query
const user = await prisma.user.findUnique({
  where: { email: 'john@example.com' },
  include: { posts: true },
});
```

## Best Practices

1. Use transactions for related operations
2. Batch queries when possible
3. Select only needed fields
4. Use cursor-based pagination
5. Keep schema in sync with migrations
