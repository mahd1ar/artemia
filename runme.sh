#! /bin/bash

set -e

echo "kill current process"

pm2 delete artemia-api || echo "no keyston process"
pm2 delete artemia-frontend || echo "no keyston process"
pm2 delete saba || echo "no keyston process"

sleep 2

cd ~/public_html/artemia || exit

unset GIT_DIR

git pull hub master

echo "build frontend"

cd ./nuxt || exit

yarn

yarn build

pm2 start "node .output/server/index.mjs" --name artemia-frontend

echo "build backend"

cd ../api

yarn

yarn build

pm2 start "yarn start" --name artemia-api

cd ../saba

yarn

yarn build

pm2 start "yarn start" --name saba
