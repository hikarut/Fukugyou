// import { contentful } from 'contentful'
const contentful = require('contentful')

const config = {
  space: process.env.SPACE,
  accessToken: process.env.ACCESS_TOKEN
}

export function createClient() {
  return contentful.createClient(config)
}
