# API Versioning Strategies

## URL Path Versioning

```
✓ /api/v1/users
✓ /api/v2/users
```

**Pros:** Easy to route, visible in URL
**Cons:** URL pollution, requires redirects

## Query Parameter

```
✓ /api/users?version=2
```

**Pros:** Non-invasive
**Cons:** Caching issues, less discoverable

## Header Versioning

```
✓ Accept: application/vnd.api.v2+json
```

**Pros:** Clean URLs
**Cons:** Less visible, requires client awareness

## Recommended Approach

Use URL path versioning for public APIs:

```
/api/v1/...    # Current stable
/api/v2/...    # New version
```

## Deprecation Strategy

1. Announce deprecation in headers
2. Provide migration timeline
3. Maintain old versions temporarily
4. Monitor usage before removal

```http
Deprecation: true
Sunset: Sat, 01 Jan 2025 00:00:00 GMT
Link: <https://api.example.com/v2>; rel="successor-version"
```
