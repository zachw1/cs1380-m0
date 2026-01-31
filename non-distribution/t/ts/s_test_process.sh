#!/bin/bash
# Test process.sh with edge cases

cd "$(dirname "$0")/../.." || exit 1

# All stopwords should produce empty output
result=$(echo "the a an is are was were" | c/process.sh)
if [ -z "$result" ]; then
    echo "$0 success"
else
    echo "$0 failure"
    exit 1
fi

