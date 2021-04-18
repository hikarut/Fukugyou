import { getToday } from '../lib/date'

/* state */
const initialState = {
  data: null
}
export const state = () => Object.assign({}, initialState)

/* mutations */
export const mutations = {
  setData(state, data) {
    console.log('mutations setData')
    state.data = data
  },
  reset(state) {
    state = Object.assign(state, initialState)
  }
}

/* getters */
export const getters = {
  data: state => state.data
}

/* actions */
export const actions = {
  // トップページ用のニュース記事取得
  async getTopNewsV2({ commit, state }) {
    // データ取得ずみならスキップ
    if (state.data !== null) return

    console.log('actions getTOpNews')

    const today = getToday()
    const data = await this.$firebase
      .firestore()
      .collection('news_v2')
      .where('date', '>=', '20210415')
      // .where('date', '>=', today)
      .get()

    const newsData = data.docs.map(doc => {
      return doc.data()
    })

    // 必要な情報を追加
    const header = process.env.constant.newsList
    const updatedAtJson = require('~/data/updatedAt.json')
    const updatedAt = updatedAtJson[0].updatedAt || ''
    const topData = {
      header: header,
      updatedAt: updatedAt,
      data: newsData
    }
    console.log('topData')
    console.log(topData)
    commit('setData', topData)
  }
}
