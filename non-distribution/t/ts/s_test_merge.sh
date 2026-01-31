#!/bin/bash

cd "$(dirname "$0")/../.." || exit 1

# Test: Merging into empty global index
temp_global=$(mktemp)
echo -n "" > "$temp_global"

local_input="hello | 5 | https://example.com"
result=$(echo "$local_input" | c/merge.js "$temp_global")
rm "$temp_global"

expected="hello | https://example.com 5"
if [ "$result" = "$expected" ]; then
    echo "$0 success"
    exit 0
else
    echo "$0 failure"
    exit 1
fi
