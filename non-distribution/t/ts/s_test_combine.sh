#!/bin/bash
# Test combine.sh with edge cases

cd "$(dirname "$0")/../.." || exit 1

# Test: Single word should produce only 1-gram (itself)
result=$(echo "hello" | c/combine.sh | grep -v '^$' | wc -l | tr -d ' ')
if [ "$result" = "1" ]; then
    echo "$0 success: single word produces one 1-gram"
    exit 0
else
    echo "$0 failure: expected 1 line but got $result"
    exit 1
fi
