# SQLAlchemy Skill

**Category:** Domain - Database  
**Priority:** 75

## Overview

Expert knowledge for SQLAlchemy ORM development.

## Key Topics

- ORM models
- Query building
- Relationships
- Migrations (Alembic)
- Async support
- Core vs ORM

## Usage

```python
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, Session
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String, unique=True)
    posts = relationship("Post", back_populates="author")

class Post(Base):
    __tablename__ = 'posts'
    
    id = Column(Integer, primary_key=True)
    title = Column(String)
    author_id = Column(Integer, ForeignKey('users.id'))
    author = relationship("User", back_populates="posts")

# Query
with Session(engine) as session:
    user = session.query(User).filter(User.email == 'john@example.com').first()
```

## Best Practices

1. Use session context managers
2. Prefer Query.get() for known IDs
3. Use lazy='joined' sparingly
4. Batch inserts for bulk operations
5. Use async sessions for async apps
