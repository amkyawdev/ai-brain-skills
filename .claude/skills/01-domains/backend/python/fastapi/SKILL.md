# FastAPI Skill

**Category:** Domain - Backend  
**Priority:** 80

## Overview

Expert knowledge for FastAPI application development.

## Key Topics

- Route handlers and dependencies
- Pydantic models
- Async patterns
- Background tasks
- WebSocket support
- OpenAPI generation

## References

- [Dependency Injection](./references/dependency-injection.md)
- [Middleware Deep Dive](./references/middleware-deep.md)
- [WebSockets](./references/websockets.md)
- [Background Tasks](./references/background-tasks.md)
- [OpenAPI Generation](./references/openapi-generation.md)

## Scripts

- [Generate CRUD](./scripts/generate-crud.py)
- [Validate Schema](./scripts/validate-schema.py)

## Templates

- [Repository Pattern](./templates/repository-pattern.py)

## Basic Usage

```python
from fastapi import FastAPI, Depends
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float

@app.post("/items")
async def create_item(item: Item):
    return item

@app.get("/items/{item_id}")
async def get_item(item_id: int):
    return {"item_id": item_id}
```

## Best Practices

1. Use Pydantic for request/response validation
2. Leverage async/await for I/O operations
3. Use dependency injection for reusable logic
4. Generate OpenAPI documentation automatically
5. Use background tasks for long-running operations
