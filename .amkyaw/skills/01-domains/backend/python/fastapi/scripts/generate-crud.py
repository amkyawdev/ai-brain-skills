#!/usr/bin/env python3
"""Generate CRUD endpoints for FastAPI"""

import sys

def generate_crud(entity_name: str):
    template = f'''
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models import {entity_name.capitalize()}
from schemas import {entity_name.capitalize()}Create, {entity_name.capitalize()}Update, {entity_name.capitalize()}Response

router = APIRouter(prefix="/{entity_name}", tags=["{entity_name}"])

@{router.get("/", response_model=List[{entity_name.capitalize()}Response])
def get_{entity_name}s(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query({entity_name.capitalize()}).offset(skip).limit(limit).all()

@{router.get("/{{{{{{entity_name}}}}_id}}", response_model={entity_name.capitalize()}Response)
def get_{entity_name}({{entity_name}}_id: int, db: Session = Depends(get_db)):
    item = db.query({entity_name.capitalize()}).filter({entity_name.capitalize()}.id == {{entity_name}}_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="{entity_name.capitalize()} not found")
    return item

@{router.post("/", response_model={entity_name.capitalize()}Response, status_code=201)
def create_{entity_name}({entity_name}: {entity_name.capitalize()}Create, db: Session = Depends(get_db)):
    db_{entity_name} = {entity_name.capitalize()}(**{entity_name}.dict())
    db.add(db_{entity_name})
    db.commit()
    db.refresh(db_{entity_name})
    return db_{entity_name}

@{router.put("/{{{{{{entity_name}}}}_id}}", response_model={entity_name.capitalize()}Response)
def update_{entity_name}({{entity_name}}_id: int, {entity_name}: {entity_name.capitalize()}Update, db: Session = Depends(get_db)):
    db_{entity_name} = db.query({entity_name.capitalize()}).filter({entity_name.capitalize()}.id == {{entity_name}}_id).first()
    if not db_{entity_name}:
        raise HTTPException(status_code=404, detail="{entity_name.capitalize()} not found")
    for key, value in {entity_name}.dict(exclude_unset=True).items():
        setattr(db_{entity_name}, key, value)
    db.commit()
    db.refresh(db_{entity_name})
    return db_{entity_name}

@{router.delete("/{{{{{{entity_name}}}}_id}}", status_code=204)
def delete_{entity_name}({{entity_name}}_id: int, db: Session = Depends(get_db)):
    db_{entity_name} = db.query({entity_name.capitalize()}).filter({entity_name.capitalize()}.id == {{entity_name}}_id).first()
    if not db_{entity_name}:
        raise HTTPException(status_code=404, detail="{entity_name.capitalize()} not found")
    db.delete(db_{entity_name})
    db.commit()
'''
    print(template)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        generate_crud(sys.argv[1])
    else:
        print("Usage: python generate-crud.py <entity_name>")
