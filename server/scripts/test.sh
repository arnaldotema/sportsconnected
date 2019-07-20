#!/bin/bash

echo "Running server unit tests"

export NODE_ENV=test
export MONGO_URL=mongodb://mongo:27017/sports_connected

npm run test --