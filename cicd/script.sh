#!/bin/bash

whoami
ls
cd ~/BuildForBharat/
git pull
docker compose down
docker rmi frontend
docker rmi backend
docker rmi github-updater
docker compose up -d