# RESTful Best Practices

## Resource Naming

```
GET    /users          # List users
GET    /users/{id}     # Get user
POST   /users          # Create user
PUT    /users/{id}     # Update user
DELETE /users/{id}     # Delete user
```

## Best Practices

### Use nouns, not verbs
```
✓ GET /users
✗ GET /getUsers
```

### Use plural nouns
```
✓ GET /users
✗ GET /user
```

### Nest resources logically
```
✓ GET /users/{id}/orders
✓ GET /orders?user_id={id}
```

### Use query parameters for filtering
```
GET /products?category=electronics&price_min=100
```

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

## Pagination

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 100,
    "total_pages": 5
  }
}
```
