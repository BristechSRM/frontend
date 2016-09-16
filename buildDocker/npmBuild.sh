#!/bin/sh -euv

cd code
npm install

npm run build:prod

cd ..
cp -R code/public packed/
cp code/package.json packed/
cp code/server.js packed/
