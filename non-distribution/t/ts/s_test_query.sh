#!/bin/bash

cd "$(dirname "$0")/../.." || exit 1

# Query for term that doesn't exist should return empty
# Create a temporary global index
temp_index="d/global-index.txt"
echo "apple | https://example.com 5" > "$temp_index"

result=$(./query.js "nonexistentterm")

# Clean up
rm "$temp_index"

if [ -z "$result" ]; then
    echo "$0 success"
    exit 0
else
    echo "$0 failure"
    exit 1
fi
