#!/bin/sh -eu
DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
echo $DIR

rm -rf $DIR/code
rm -rf $DIR/packed
rm -rf $DIR/context
mkdir -p $DIR/code
mkdir -p $DIR/packed
mkdir $DIR/context

git clone --depth 1 https://github.com/BristechSRM/frontend.git $DIR/code

docker run -v $DIR/code:/code \
    -v $DIR/packed:/packed \
    node /code/buildDocker/npmBuild.sh

sudo chown -R docker:docker $DIR/code
sudo chown -R docker:docker $DIR/packed
sudo chown -R docker:docker $DIR/context

cp $DIR/Dockerfile $DIR/context/Dockerfile
cp -R $DIR/packed/ $DIR/context/
cd $DIR/context/
docker build -t frontend . 
IMAGEID=$(docker images frontend:latest -q)
docker tag $IMAGEID bristechsrm/frontend:latest
