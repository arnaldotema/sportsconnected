#!/bin/bash

echo "Running the server in PROD mode"

export NODE_ENV=PROD
export MONGO_URL=mongodb://admin:pywball12@199.247.15.139:27017/sports_connected?authSource=admin

npm start --