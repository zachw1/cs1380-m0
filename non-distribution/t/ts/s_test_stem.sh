#!/bin/bash

cd "$(dirname "$0")/../.." || exit 1

# empty input should produce empty output
if [ "$(echo "" | c/stem.js)" = "" ]; then
    echo "$0 success"
else
    echo "$0 failure: empty input should produce empty output"
    exit 1
fi

# already stemmed words should remain unchanged
result=$(echo -e "run\njump\nwalk" | c/stem.js | tr '\n' ' ' | sed 's/ $//')
expected="run jump walk"
if [ "$result" = "$expected" ]; then
    echo "$0 success"
    exit 0
else
    echo "$0 failure: expected '$expected' but got '$result'"
    exit 1
fi
