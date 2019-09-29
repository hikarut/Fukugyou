import firebase from 'firebase/app'
import 'firebase/firestore'
import fs from 'fs'
import { getTopTerm, getAllTerm } from '../lib/date'

module.exports = function generateModule(moduleOptions) {
  // prod環境の時だけ実行
  if (process.env.NODE_ENV !== 'prod') return
  console.log('modules generator')

  // nuxtのビルド前
  this.nuxt.hook('build:before', async ({ app }) => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DATABASE_URL,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID
      })
    }

    // トップページ用のデータを取得
    const { start, end } = getTopTerm()
    const topSnapshot = await firebase
      .firestore()
      .collection('news')
      .where('date', '>=', start)
      .where('date', '<=', end)
      .orderBy('date', 'desc')
      .get()

    const topNews = topSnapshot.docs.map(doc => {
      return doc.data()
    })
    // JSONを生成
    const distJosonFile = './data/top.json'
    fs.writeFile(distJosonFile, JSON.stringify(topNews), (err, result) => {
      if (err) console.log('error', err)
    })

    // 日次のデータを取得
    const allTerm = getAllTerm()
    allTerm.forEach(async day => {
      const dailySnapshot = await firebase
        .firestore()
        .collection('news')
        .where('date', '==', day.value)
        .get()

      let dailyData = []
      if (dailySnapshot.docs.length > 0) {
        dailyData = dailySnapshot.docs.map(doc => {
          return doc.data()
        })
      }
      // JSONを生成
      const distJosonFile = `./data/${day.value}.json`
      fs.writeFile(distJosonFile, JSON.stringify(dailyData), err => {
        if (err) console.log('error', err)
      })
    })

    // 月次のデータを取得
    const uniqMonth = allTerm
      .map((val, key, self) => {
        return val.key
      })
      .filter(function(x, i, self) {
        return self.indexOf(x) === i
      })

    uniqMonth.forEach(async month => {
      const monthlySnapshot = await firebase
        .firestore()
        .collection('news')
        .where('month', '==', month)
        .get()

      let monthlyData = []
      if (monthlySnapshot.docs.length > 0) {
        monthlyData = monthlySnapshot.docs.map(doc => {
          return doc.data()
        })
      }
      // JSONを生成
      const distJosonFile = `./data/${month}.json`
      fs.writeFile(distJosonFile, JSON.stringify(monthlyData), err => {
        if (err) console.log('error', err)
      })
    })
  })
}
