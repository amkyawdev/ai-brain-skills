# Middleware Deep Dive

## Basic Middleware

```python
from fastapi import FastAPI, Request

app = FastAPI()

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response
```

## CORS Middleware

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Custom Middleware Class

```python
from starlette.middleware.base import BaseHTTPMiddleware

class MyMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Before request
        response = await call_next(request)
        # After request
        response.headers["X-Custom"] = "value"
        return response

app.add_middleware(MyMiddleware)
```

## Common Middleware Uses

- Request logging
- Authentication
- Rate limiting
- CORS
- GZip compression
- Session management
