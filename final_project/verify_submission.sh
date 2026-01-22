#!/bin/bash
echo "=== Verifying AI-Graded Submission Files ==="
echo

for file in getallbooks getbookbyisbn getbookbyauthor getbookbytitle; do
  echo "Checking $file:"
  
  if [ -f "$file" ]; then
    echo "  ✓ File exists"
    
    # Check file has at least 2 lines (command + output)
    lines=$(wc -l < "$file")
    if [ $lines -ge 2 ]; then
      echo "  ✓ Has $lines lines (minimum 2)"
    else
      echo "  ✗ Only $lines lines (needs at least 2)"
    fi
    
    # Check first line is curl command
    if head -1 "$file" | grep -q "curl"; then
      echo "  ✓ First line is curl command"
    else
      echo "  ✗ First line is not curl command"
    fi
    
    # Check second line starts with { or [
    if [ $lines -ge 2 ]; then
      if sed -n '2p' "$file" | grep -q "^[{\[]"; then
        echo "  ✓ Second line starts with JSON"
      else
        echo "  ✗ Second line doesn't start with JSON"
      fi
    fi
  else
    echo "  ✗ File not found!"
  fi
  echo
done

echo "=== All files should look like this ==="
echo "curl http://localhost:5001/"
echo "{"
echo '  "1": {'
echo '    "author": "Chinua Achebe",'
echo '    "title": "Things Fall Apart",'
echo '    "reviews": {}'
echo '  },'
echo '  ...'
echo "}"
