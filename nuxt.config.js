import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import { getAllTerm } from './lib/date'
const environment = process.env.NODE_ENV || 'dev'
const conf = require(`./config/constant.${environment}.json`)
const constant = require('./config/constant.json')

// 環境変数
const space = process.env.SPACE || 'space'
const accessToken = process.env.ACCESS_TOKEN || 'accessToken'
const contentType = process.env.CONTENT_TYPE || 'contentType'
const apiKey = process.env.API_KEY || 'apiKey'
const authDomain = process.env.AUTH_DOMAIN || 'authDomain'
const databaseUrl = process.env.DATABASE_URL || 'databaseUrl'
const projectId = process.env.PROJECT_ID || 'projectId'
const storageBucket = process.env.STORAGE_BUCKET || 'storageBucket'
const messagingSenderId = process.env.MESSAGING_SENDER_ID || 'messagingSenderId'
const appId = process.env.APP_ID || 'appId'
const adsenseId = process.env.ADSENSE_ID || 'adsenseId'

// contentfulから記事を取得する
const contentful = require('contentful')
const client = contentful.createClient({
  space: space,
  accessToken: accessToken,
  timeout: 60000,
  retryLimit: 10
})

// ルーティング
function routing() {
  const allTerm = getAllTerm()
  return client
    .getEntries({
      content_type: contentType
    })
    .then(entries => {
      const page = Math.ceil(entries.total / constant.postsPerPage)
      return [
        ...entries.items.map(entry => `/posts/${entry.fields.url}`),
        // ページング
        ...[...Array(page).keys()].map(i => `/posts/page/${i + 1}`),
        // 日次のパス生成
        ...allTerm.map(data => `/news/${data.key}/${data.value}`),
        // 月次のパス生成
        ...allTerm.map(data => `/news/${data.key}`)
      ]
    })
    .catch(error => {
      console.log('error')
      console.log(error)
    })
}

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
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:image:src',
        property: 'twitter:image:src',
        content: `${constant.url}/ogimage.png`
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'dns-prefetch', href: '//pagead2.googlesyndication.com' },
      { rel: 'dns-prefetch', href: '//tpc.googlesyndication.com' },
      { rel: 'dns-prefetch', href: '//googleads.g.doubleclick.net' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Noto+Sans+JP&display=swap'
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
  plugins: [
    '@/plugins/vuetify',
    { src: '~/plugins/ga.js', ssr: false },
    { src: '~/plugins/lazyload.js', ssr: false },
    { src: '~/plugins/device.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/sitemap',
    '~/modules/generator',
    [
      '@nuxtjs/google-adsense',
      {
        id: adsenseId
      }
    ],
    '@nuxtjs/markdownit',
    [
      '@nuxtjs/device',
      {
        defaultUserAgent:
          'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Mobile Safari/537.36'
      }
    ]
  ],

  markdownit: {
    injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
    breaks: true, // 改行コードを<br>に変換する
    html: true, // HTML タグを有効にする
    linkify: true, // URLに似たテキストをリンクに自動変換する
    typography: true // 言語に依存しないきれいな 置換 + 引用符 を有効にします。
  },

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
      config.module.rules.push({
        test: /\.json5$/,
        loader: 'json5-loader',
        exclude: /(node_modules)/
      })
      config.node = {
        fs: 'empty'
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
    CONTENT_TYPE: contentType,
    API_KEY: apiKey,
    AUTH_DOMAIN: authDomain,
    DATABASE_URL: databaseUrl,
    PROJECT_ID: projectId,
    STORAGE_BUCKET: storageBucket,
    MESSAGING_SENDER_ID: messagingSenderId,
    APP_ID: appId
  },

  /*
  ** generateオプション
  */
  generate: {
    async routes() {
      return routing()
    }
  },

  /*
  ** sitemap作成オプション
  */
  sitemap: {
    // path: '/sitemap.xml',
    hostname: constant.url,
    generate: true,
    exclude: ['/404', 'ads.txt'],
    routes() {
      return routing()
    }
  }
}
