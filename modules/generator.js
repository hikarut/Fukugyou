// import firebase from 'firebase/app'
// import 'firebase/firestore'
// import { getTopTerm } from '../lib/date'
//
// module.exports = function generateModule(moduleOptions) {
//   console.log('modules generator')
//
//   // nuxtのビルド前
//   this.nuxt.hook('build:before', async ({ app }) => {
//     if (!firebase.apps.length) {
//       firebase.initializeApp({
//         apiKey: process.env.API_KEY,
//         authDomain: process.env.AUTH_DOMAIN,
//         databaseURL: process.env.DATABASE_URL,
//         projectId: process.env.PROJECT_ID,
//         storageBucket: process.env.STORAGE_BUCKET,
//         messagingSenderId: process.env.MESSAGING_SENDER_ID,
//         appId: process.env.APP_ID
//       })
//     }
//
//     console.log('build:before')
//     const { start, end } = getTopTerm()
//     const topSnapshot = await firebase
//       .firestore()
//       .collection('news')
//       .where('date', '>=', start)
//       .where('date', '<=', end)
//       .orderBy('date', 'desc')
//       .get()
//
//     const topNews = topSnapshot.docs.map(doc => {
//       return doc.data()
//     })
//
//     // JSONを生成
//     this.options.build.plugins.push({
//       apply(compiler) {
//         compiler.plugin('emit', (compilation, cb) => {
//           compilation.assets['top.json'] = {
//             source: () => JSON.stringify(topNews),
//             size: () => {}
//           }
//           cb()
//           console.log('topNews')
//           console.log(topNews.length)
//           console.log(JSON.stringify(topNews))
//         })
//       }
//     })
//   })
// }

export default function(moduleOptions) {
  const info = 'Built by awesome module - 1.3 alpha on ' + Date.now()

  // this.options.build.plugins.push({
  //   apply(compiler) {
  //     compiler.plugin('emit', (compilation, cb) => {
  //       // info 変数の内容を用いて `.nuxt/dist/info.txt' を生成する
  //       // source はバッファとなる
  //       compilation.assets['info.txt'] = {
  //         source: () => info,
  //         size: () => info.length
  //       }
  //       // cb()
  //       console.log(info)
  //     })
  //   }
  // })
}
