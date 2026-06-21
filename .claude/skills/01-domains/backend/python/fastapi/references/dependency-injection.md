# Dependency Injection

## Basic Dependency

```python
from fastapi import Depends

async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/users")
async def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()
```

## Class Dependencies

```python
class CommonQueryParams:
    def __init__(self, skip: int = 0, limit: int = 10):
        self.skip = skip
        self.limit = limit

@app.get("/items")
async def get_items(params: CommonQueryParams = Depends()):
    return {"skip": params.skip, "limit": params.limit}
```

## Sub-dependencies

```python
def query_extractor(q: str | None = None):
    return q

def query_or_cookie_extractor(
    q: str = Depends(query_extractor)
):
    return q

@app.get("/items/")
async def read_query(q: str = Depends(query_or_cookie_extractor)):
    return {"q": q}
```

## Dependencies with Parameters

```python
async def verify_token(x_token: str = Header()):
    if x_token != "secret":
        raise HTTPException(status_code=400, detail="Invalid token")
    return x_token

@app.get("/protected", dependencies=[Depends(verify_token)])
async def protected_route():
    return {"message": "Protected"}
```
