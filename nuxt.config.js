import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'
const environment = process.env.NODE_ENV || 'dev'
const conf = require(`./config/constant.${environment}.json`)
const constant = require('./config/constant.json')

// contentfulから記事を取得する
const contentful = require('contentful')
const space = process.env.SPACE || 'space'
const accessToken = process.env.ACCESS_TOKEN || 'accessToken'
const contentType = process.env.CONTENT_TYPE || 'contentType'
const client = contentful.createClient({
  space: space,
  accessToken: accessToken
})

export default {
  // 本来spaモードだがそれだとページごとのmetaが反映されないので
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: constant.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: constant.keywords },
      {
        hid: 'description',
        name: 'description',
        content: constant.description
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: constant.title
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: constant.url },
      { hid: 'og:title', property: 'og:title', content: constant.title },
      {
        hid: 'og:description',
        property: 'og:description',
        content: constant.description
      },
      { hid: 'og:image', property: 'og:image', content: '/ogimage.png' },
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary' },
      {
        hid: 'twitter:image:src',
        property: 'twitter:image:src',
        content: `${constant.url}/ogimage.png`
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Noto+Sans+SC'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#4383d7', height: '5px' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl',
    '~/assets/common.css',
    '@fortawesome/fontawesome-free/css/all.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/vuetify', { src: '~plugins/ga.js', ssr: false }],

  /*
  ** Nuxt.js modules
  */
  modules: [],

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  /*
  ** env
  */
  env: {
    conf: conf,
    constant: constant,
    SPACE: space,
    ACCESS_TOKEN: accessToken,
    CONTENT_TYPE: contentType
  },

  /*
  ** generateオプション
  */
  generate: {
    routes() {
      return client
        .getEntries({
          content_type: 'blog'
        })
        .then(entries => {
          return [...entries.items.map(entry => `/posts/${entry.fields.url}`)]
        })
        .catch(error => {
          console.log('error')
          console.log(error)
        })
    }
  }
}
