#!/bin/bash
echo "=== Checking AI-Grading Format ==="
echo

for file in getallbooks getbookbyisbn getbookbyauthor getbookbytitle; do
  echo "File: $file"
  echo "Line 1 (should be curl command):"
  head -1 "$file"
  echo
  echo "Line 2 (should start with { or [):"
  sed -n '2p' "$file" | cut -c1-50
  echo "..."
  echo "---"
done
