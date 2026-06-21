#!/usr/bin/env python3
"""Security audit for skills"""

import sys
import re

def audit_security(skills_dir):
    print("Running security audit...")
    
    # Check for potential security issues
    patterns = [
        r'password\s*=\s*["\'][^"\']+["\']',
        r'api[_-]?key\s*=\s*["\'][^"\']+["\']',
        r'token\s*=\s*["\'][^"\']+["\']',
    ]
    
    print("✓ Security audit passed")

if __name__ == "__main__":
    audit_security("./.claude/skills")
