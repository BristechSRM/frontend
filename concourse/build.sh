#! /bin/sh

set -e
export NODE_ENV=production

cd code

npm install
npm run build
cd ..
cp -R code/public/* packed/
cp code/server.js packed/
