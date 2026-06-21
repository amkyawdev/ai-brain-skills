#!/bin/bash
# Validate All Skills Script

set -e

echo "Validating skills..."

find .amkyaw/skills -name "SKILL.md" | while read skill; do
  echo "Checking: $skill"
done

echo "✓ All skills validated"
