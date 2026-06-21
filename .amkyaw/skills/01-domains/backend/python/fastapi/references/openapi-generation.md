# OpenAPI Generation

## Automatic Documentation

FastAPI automatically generates OpenAPI documentation:
- Swagger UI: `/docs`
- ReDoc: `/redoc`

## Custom OpenAPI Schema

```python
app = FastAPI(
    title="My API",
    description="API Description",
    version="1.0.0",
    docs_url="/documentation",
    redoc_url=None
)
```

## Response Model

```python
class Item(BaseModel):
    name: str
    description: str | None = None
    price: float

@app.get("/items/{item_id}", response_model=Item)
async def get_item(item_id: int):
    return {"name": "Item", "price": 10.0}
```

## Status Codes

```python
@app.post("/items", status_code=status.HTTP_201_CREATED)
async def create_item(item: Item):
    return item

@app.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(item_id: int):
    pass
```

## Examples

```python
from pydantic import Field

class Item(BaseModel):
    name: str = Field(..., example="Widget")
    price: float = Field(..., gt=0, example=9.99)

@app.post("/items", response_model=Item)
async def create_item(item: Item):
    return item
```

## Documentation URLs

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
- OpenAPI JSON: `http://localhost:8000/openapi.json`
