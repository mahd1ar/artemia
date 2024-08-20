#! /bin/bash

set -e

echo "kill current process"

pm2 delete artemia-api || echo "no keyston process"
pm2 delete artemia-frontend || echo "no keyston process"

sleep 2

cd ~/public_html/artemia || exit

cd ./nuxt || exit

pm2 start "eval $(cat ./.env) node .output/server/index.mjs" --name artemia-frontend

cd ../api

pm2 start "yarn start" --name artemia-api
