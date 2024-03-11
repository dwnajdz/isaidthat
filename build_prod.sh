#!/usr/bin/bash

remove_dev_directories () {
    echo "[build] removing development folders"
    #rm -rf node_modules
    #rm -rf .next
    #rm package-lock.json
    cd ./src

    rm -rf cypress
    rm cypress.config.ts
}

# remove useless dir that just take space
remove_dev_directories

if command -v docker-compose &> /dev/null; then
    echo "Using docker-compose"
    docker-compose -f docker-compose.prod.yaml build
    docker-compose -f docker-compose.prod.yaml up 
elif  command -v docker compose &> /dev/null; then
    echo "Using docker compose"
    docker compose -f docker-compose.prod.yaml build
    docker compose -f docker-compose.prod.yaml up 
else
    echo "Using docker build, docker-compose not installed"
    cd ./src

    # build docker image
    docker build -t web-production -f dev.Dockerfile .
    docker run -p 80:80 web-production
fi
