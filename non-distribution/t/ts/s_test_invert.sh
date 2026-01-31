#!/bin/bash
# Test invert.sh with edge cases

cd "$(dirname "$0")/../.." || exit 1

# Test: Same term appearing multiple times should have correct frequency
url="https://example.com/page.html"
result=$(printf "hello\nhello\nhello" | c/invert.sh "$url" | grep "^hello")

# Should contain "hello | 3 | url"
if echo "$result" | grep -q "3"; then
    echo "$0 success: frequency count is correct"
    exit 0
else
    echo "$0 failure: expected frequency 3 but got: $result"
    exit 1
fi
