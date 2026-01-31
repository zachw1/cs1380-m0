#!/bin/bash
# End-to-end test: full indexing pipeline

cd "$(dirname "$0")/../.." || exit 1

# Test the indexing pipeline: process -> stem -> combine -> invert -> merge
tmp_global=$(mktemp)
echo "" > "$tmp_global"

# Use non-stopword terms
test_text="Apple Banana Apple Cherry"
test_url="http://example.org/page"

# Run the full pipeline
result=$(echo "$test_text" | ./c/process.sh | ./c/stem.js | ./c/combine.sh | ./c/invert.sh "$test_url" | ./c/merge.js "$tmp_global")
rm -f "$tmp_global"

# Should have "appl" (stemmed from apple) with frequency 2
if echo "$result" | grep -q "appl" && echo "$result" | grep -q "2" && echo "$result" | grep -q "$test_url"; then
    echo "$0 success: end-to-end pipeline works correctly"
    exit 0
else
    echo "$0 failure: end-to-end pipeline failed"
    echo "Expected 'appl' with freq 2 at $test_url"
    echo "Got: $result"
    exit 1
fi
