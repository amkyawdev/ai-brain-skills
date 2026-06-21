#!/usr/bin/env python3
"""Validate Pydantic schemas"""

import sys
import json
import yaml
from pathlib import Path

def validate_schema(schema_path: str):
    """Validate a schema file against the Pydantic conventions."""
    path = Path(schema_path)
    
    if not path.exists():
        print(f"Error: Schema file not found: {schema_path}")
        sys.exit(1)
    
    if path.suffix == '.json':
        with open(path) as f:
            data = json.load(f)
    elif path.suffix in ['.yaml', '.yml']:
        with open(path) as f:
            data = yaml.safe_load(f)
    else:
        print(f"Error: Unsupported file format: {path.suffix}")
        sys.exit(1)
    
    # Validate structure
    required_keys = ['title', 'type', 'properties']
    for key in required_keys:
        if key not in data:
            print(f"Warning: Missing recommended key: {key}")
    
    # Validate properties
    if 'properties' in data:
        for prop_name, prop_data in data['properties'].items():
            if 'type' not in prop_data:
                print(f"Warning: Property '{prop_name}' missing type")
    
    print(f"✓ Schema validation complete for: {schema_path}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        validate_schema(sys.argv[1])
    else:
        print("Usage: python validate-schema.py <schema_file>")
