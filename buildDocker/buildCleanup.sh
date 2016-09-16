#!/bin/sh -eu
DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
echo $DIR

rm -rf $DIR/code
rm -rf $DIR/packed
rm -rf $DIR/context
