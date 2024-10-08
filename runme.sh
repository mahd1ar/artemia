#! /bin/bash

set -e

echo "kill current process"

pm2 delete artemia-api || echo "no keyston process"
pm2 delete artemia-frontend || echo "no keyston process"

sleep 2

cd ~/public_html/artemia || exit

unset GIT_DIR
git restore .
git pull hub master

echo "build frontend"

cd ./nuxt || exit

yarn

yarn build

pm2 start "eval $(cat ./.env) node .output/server/index.mjs" --name artemia-frontend

echo "build backend"

cd ../api

yarn

yarn build

pm2 start "yarn start" --name artemia-api