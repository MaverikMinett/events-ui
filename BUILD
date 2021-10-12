#!/bin/bash

env=$ENV

if [ ! -z "$1" ]; then
    env=$1
fi

if [ -z "$env" ]; then
    env=production
fi

echo "Building for $env"

ng build --configuration $env
