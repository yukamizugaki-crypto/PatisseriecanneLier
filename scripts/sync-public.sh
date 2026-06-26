#!/bin/sh
set -eu

rm -rf public
mkdir -p public/img

cp index.html public/
cp wholecake.html public/
cp style.css public/
cp script.js public/
cp -R img/. public/img/
