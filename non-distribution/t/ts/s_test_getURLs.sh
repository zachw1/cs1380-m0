#!/bin/bash
# Test getURLs.js with various URL types

cd "$(dirname "$0")/../.." || exit 1

base_url="https://example.com/page/index.html"
html='<html><body><a href="link.html">Relative</a><a href="/root.html">Absolute path</a><a href="https://other.com/external">External</a><a>No href</a></body></html>'

result=$(echo "$html" | ./c/getURLs.js "$base_url" | sort)

# relative URL resolved correctly
if ! echo "$result" | grep -q "https://example.com/page/link.html"; then
    echo "$0 failure: relative URL not resolved correctly"
    echo "Got: $result"
    exit 1
fi

# absolute path resolved correctly
if ! echo "$result" | grep -q "https://example.com/root.html"; then
    echo "$0 failure: absolute path not resolved correctly"
    echo "Got: $result"
    exit 1
fi

# external URL preserved
if ! echo "$result" | grep -q "https://other.com/external"; then
    echo "$0 failure: external URL not preserved"
    echo "Got: $result"
    exit 1
fi

echo "$0 success"
exit 0
