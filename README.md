# Fukugyou

> My fabulous Nuxt.js project

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

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
