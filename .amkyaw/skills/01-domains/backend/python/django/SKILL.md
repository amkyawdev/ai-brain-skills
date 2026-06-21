# Django Skill

**Category:** Domain - Backend  
**Priority:** 75

## Overview

Expert knowledge for Django application development.

## Key Topics

- Django ORM
- Class-based views
- Django REST Framework
- Django Admin
- Forms and validation
- Testing

## Usage

```python
# models.py
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

# views.py
from django.views.generic import ListView, DetailView
from .models import Post

class PostListView(ListView):
    model = Post
    template_name = 'blog/post_list.html'
    context_object_name = 'posts'
```

## Best Practices

1. Use Django's built-in authentication
2. Leverage the ORM effectively
3. Write comprehensive tests
4. Use Django REST Framework for APIs
5. Follow the Django project layout conventions
