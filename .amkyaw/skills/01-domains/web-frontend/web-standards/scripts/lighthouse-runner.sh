#!/bin/bash
# Lighthouse CI runner

URL="${1:-http://localhost:3000}"

echo "Running Lighthouse for: $URL"

npx lighthouse "$URL" \
  --output=html \
  --output-path=./lighthouse-report.html \
  --chrome-flags="--headless" \
  --quiet

echo "Report saved to ./lighthouse-report.html"
