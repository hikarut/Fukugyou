import { getBeforeDate } from '../lib/date'

/* state */
const initialState = {
  topData: null,
  beforeData: null,
  dateBeforeNumber: 1,
  newsDetail: null,
  favoriteData: null
}
export const state = () => Object.assign({}, initialState)

/* mutations */
export const mutations = {
  setTopData(state, data) {
    state.topData = data
  },
  setBeforeData(state, data) {
    let setData = null
    if (state.beforeData === null) {
      setData = data
    } else {
      setData = [...state.beforeData.data, ...data]
    }
    const beforeData = {
      data: setData
    }
    state.beforeData = beforeData
  },
  setDateBeforeNumber(state, number) {
    state.dateBeforeNumber += number
  },
  setNewsDetail(state, { newsDetailData }) {
    state.newsDetail = newsDetailData
  },
  setFavoriteData(state, favoriteData) {
    state.favoriteData = favoriteData
  },
  reset(state) {
    state = Object.assign(state, initialState)
  }
}

/* getters */
export const getters = {
  topData: state => state.topData,
  beforeData: state => state.beforeData,
  dateBeforeNumber: state => state.dateBeforeNumber,
  newsDetail: state => state.newsDetail,
  favoriteData: state => state.favoriteData
}

/* actions */
export const actions = {
  // トップページ用のニュース記事取得
  async getTopNewsV2({ commit, state }) {
    // データ取得ずみならスキップ
    if (state.topData !== null) return

    const header = process.env.constant.newsList
    const newsData = require('~/data/top.json')
    const updatedAtJson = require('~/data/updatedAt.json')
    const updatedAt = updatedAtJson[0].updatedAt || ''
    const topData = {
      header: header,
      updatedAt: updatedAt,
      data: newsData
    }
    commit('setTopData', topData)
  },

  // ニュースページで過去のニュースデータ取得
  async getBeforeNews({ commit, state }, date) {
    try {
      const beforeNewsData = await this.$firebase
        .firestore()
        // .collection(beforeDate)
        .collection(date)
        .get()
      const data = beforeNewsData.docs.map(doc => {
        return doc.data()
      })

      // データの追加
      commit('setBeforeData', data)
      commit('setDateBeforeNumber', 1)
    } catch (error) {
      console.log(error)
    }
  },

  // IDを指定してデータを取得
  async getNewsById({ commit, state }, id) {
    const data = await this.$firebase
      .firestore()
      .collection(id)
      .get()

    const newsData = data.docs.map(doc => {
      return doc.data()
    })
    // TODO:データが空([])だった時の対応
    // setNewsDetailにundefinedが入ってる
    // console.log(newsData)
    const newsDetailData = newsData[0]
    commit('setNewsDetail', { newsDetailData })
  },

  // お気に入りデータの取得
  async getFavoriteData({ commit, state }, uid) {
    const data = await this.$firebase
      .firestore()
      .collection(uid)
      .doc('news')
      .collection('data')
      .get()

    const favoriteData = data.docs.map(doc => {
      return doc.data()
    })
    commit('setFavoriteData', favoriteData)
  }
}
