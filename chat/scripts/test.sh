#!/bin/bash

echo "Running chat server unit tests"

export NODE_ENV=test
export MONGO_URL=mongodb://localhost:27017/sports_connected

npm run test --