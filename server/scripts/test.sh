#!/bin/bash

echo "Running server tests"

export NODE_ENV=test

cd ./..
npm run test