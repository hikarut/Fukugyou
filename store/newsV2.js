import { getToday } from '../lib/date'

/* state */
const initialState = {
  topData: null,
  newsDetail: null,
  favoriteData: null
}
export const state = () => Object.assign({}, initialState)

/* mutations */
export const mutations = {
  setTopData(state, data) {
    state.topData = data
  },
  setNewsDetail(state, { newsDetailData }) {
    console.log('mutations setNewsDetail')
    state.newsDetail = newsDetailData
  },
  // setFavoriteData(state, { favoriteData }) {
  setFavoriteData(state, favoriteData) {
    console.log('mutations setFavoriteData')
    console.log(favoriteData)
    state.favoriteData = favoriteData
  },
  reset(state) {
    state = Object.assign(state, initialState)
  }
}

/* getters */
export const getters = {
  topData: state => state.topData,
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

  // IDを指定してデータを取得
  async getNewsById({ commit, state }, id) {
    console.log('getNewsById')
    console.log(id)
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
    console.log('newsDetailData')
    commit('setNewsDetail', { newsDetailData })
  },

  // お気に入りデータの取得
  async getFavoriteData({ commit, state }, uid) {
    console.log('getFavoriteData')
    console.log(uid)

    const data = await this.$firebase
      .firestore()
      .collection(uid)
      .doc('news')
      .collection('data')
      .get()

    const favoriteData = data.docs.map(doc => {
      return doc.data()
    })
    console.log(favoriteData)
    const favoriteListData = {
      // header: 'aa',
      // updatedAt: '',
      data: favoriteData
    }
    console.log(favoriteListData)
    // commit('setFavoriteData', { favoriteData })
    commit('setFavoriteData', favoriteData)
    // commit('setFavoriteData', favoriteListData)
    // commit('setFavoriteData', { favoriteListData })
  }
}
