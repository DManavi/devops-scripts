#!/bin/bash

# You can add your own extensions to the regexp below

for i in `find $1 | grep -E "\.css$|\.js$|\.html$"`; do gzip -k -4 "$i" ; done
