git restore .
git pull hub master
rm -rf .keystone/
yarn
yarn build && yarn start
