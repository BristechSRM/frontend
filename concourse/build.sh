#! /bin/sh

set -e

cd code
npm install

export NODE_ENV=production
npm run build

cd ..
cp -R code/public/* packed/public
cp code/server.js packed/
