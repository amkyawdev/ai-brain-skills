#!/usr/bin/env python3
"""
Context Compressor Script
Compresses large context windows while preserving key information.
"""

import sys
import json
import re
from typing import Optional


def compress_text(text: str, max_tokens: int = 8000) -> str:
    """Compress text to fit within token limit."""
    max_chars = max_tokens * 4
    
    if len(text) <= max_chars:
        return text
    
    return text[:max_chars] + "\n\n[... content truncated ...]"


def remove_redundancy(text: str) -> str:
    """Remove repeated phrases and boilerplate."""
    lines = text.split('\n')
    seen = set()
    unique_lines = []
    
    for line in lines:
        normalized = ' '.join(line.split())
        if normalized not in seen and len(normalized) > 10:
            seen.add(normalized)
            unique_lines.append(line)
    
    return '\n'.join(unique_lines)


def main():
    if len(sys.argv) < 2:
        print("Usage: python context-compressor.py <input_file>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    
    with open(input_file, 'r') as f:
        content = f.read()
    
    compressed = remove_redundancy(content)
    compressed = compress_text(compressed)
    
    print(compressed)


if __name__ == "__main__":
    main()
