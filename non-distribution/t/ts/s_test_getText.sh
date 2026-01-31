#!/bin/bash
# Test getText.js with edge cases

cd "$(dirname "$0")/../.." || exit 1

# Test: Minimal HTML with just text
input="<html><body>Hello World</body></html>"
result=$(echo "$input" | c/getText.js | tr -d '\n' | tr -s ' ')
if echo "$result" | grep -q "Hello World"; then
    echo "$0 success: extracted text from minimal HTML"
    exit 0
else
    echo "$0 failure: expected Hello World in output but got $result"
    exit 1
fi
