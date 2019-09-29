# Fukugyou
[![Netlify Status](https://api.netlify.com/api/v1/badges/4bd29a1d-21af-45d6-ab20-904abd937c83/deploy-status)](https://app.netlify.com/sites/fukugyou/deploys)

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3333
$ PORT=3333 ./node_modules/cross-env/dist/bin/cross-env.js NODE_ENV='dev' SPACE='contentful space id' ACCESS_TOKEN='contentful accessToken' CONTENT_TYPE='contentful contentType' node_modules/nuxt/bin/nuxt.js

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ ./node_modules/cross-env/dist/bin/cross-env.js NODE_ENV='dev' SPACE='contentful space id' ACCESS_TOKEN='contentful accessToken' CONTENT_TYPE='contentful contentType' node_modules/nuxt/bin/nuxt.js generate
```
