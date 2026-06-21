# NestJS Skill

**Category:** Domain - Backend  
**Priority:** 80

## Overview

Expert knowledge for NestJS application development.

## Key Topics

- Modules and dependency injection
- Controllers and routing
- Providers and services
- Guards and decorators
- TypeORM/Prisma integration
- Microservices

## Usage

```typescript
// items.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('items')
export class ItemsController {
  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }
}

// items.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {
  findAll() {
    return [];
  }

  create(data: CreateItemDto) {
    return { id: 1, ...data };
  }
}
```

## Best Practices

1. Use modules to organize code
2. Leverage dependency injection
3. Use DTOs for validation
4. Implement guards for authorization
5. Use interceptors for cross-cutting concerns
