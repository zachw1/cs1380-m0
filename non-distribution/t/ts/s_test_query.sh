#!/bin/bash

cd "$(dirname "$0")/../.." || exit 1

# temp global index
temp_index="d/global-index.txt"

# single term that exists
cat > "$temp_index" << 'EOF'
appl | https://example.com 5
appl banana | https://example.com 3
banana | https://other.com 2
EOF

result=$(./query.js "apple")
# "apple" stems to "appl", should match lines containing "appl"
if echo "$result" | grep -q "appl"; then
    echo "Test 1success"
else
    echo "Test 1 fail"
    rm -f "$temp_index"
    exit 1
fi

#  test 2
echo "=== Test 2: Bigram search ==="
result=$(./query.js "apple banana")
# "apple banana" stems to "appl banana"
if echo "$result" | grep -q "appl banana"; then
    echo "Test 2 success"
else
    echo "Test 2 fail"
    rm -f "$temp_index"
    exit 1
fi

# non-existent term returns empty
result=$(./query.js "xyznonexistent")
if [ -z "$result" ]; then
    echo "Test 3 success"
else
    echo "Test 3 fail"
    rm -f "$temp_index"
    exit 1
fi

# case insensitivity
cat > "$temp_index" << 'EOF'
eleph | https://example.com 5
zebra | https://other.com 3
EOF

result=$(./query.js "ELEPHANT")
# "ELEPHANT" -> "elephant" -> "eleph"
if echo "$result" | grep -q "eleph"; then
    echo "Test 4 success"
else
    echo "Test 4 fail"
    rm -f "$temp_index"
    exit 1
fi

# stopword-only query should return empty
cat > "$temp_index" << 'EOF'
the | https://example.com 5
hello | https://other.com 3
EOF

result=$(./query.js "the")
if [ -z "$result" ]; then
    echo "Test 5 success"
else
    echo "Test 5 fail"
    rm -f "$temp_index"
    exit 1
fi

# stemming works (searching "elephants" finds "eleph")
cat > "$temp_index" << 'EOF'
eleph | https://example.com 5
EOF

result=$(./query.js "elephants")
# "elephants" stems to "eleph"
if echo "$result" | grep -q "eleph"; then
    echo "Test 6 success"
else
    echo "Test 6 fail"
    rm -f "$temp_index"
    exit 1
fi

# Clean up
rm -f "$temp_index"

echo "$0 success: All query tests passed"
exit 0
