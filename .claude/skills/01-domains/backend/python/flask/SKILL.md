# Flask Skill

**Category:** Domain - Backend  
**Priority:** 70

## Overview

Expert knowledge for Flask application development.

## Key Topics

- Routes and blueprints
- Templates (Jinja2)
- Request/response handling
- Flask extensions
- Flask-RESTful
- Testing

## Usage

```python
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/items', methods=['GET', 'POST'])
def items():
    if request.method == 'POST':
        data = request.json
        return jsonify(created=data), 201
    return jsonify(items=[])

if __name__ == '__main__':
    app.run(debug=True)
```

## Best Practices

1. Use blueprints for organization
2. Configure from environment variables
3. Use Flask-Migrate for database migrations
4. Write tests with pytest-flask
5. Consider Flask-SocketIO for websockets
