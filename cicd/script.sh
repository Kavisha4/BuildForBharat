#!/bin/bash

cd ~/BuildForBharat/
git pull
docker compose down
docker rmi frontend
docker rmi backend
docker compose up -d