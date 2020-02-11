import { getTopTerm, dateString, addSlash, addDateString } from '~/lib/date'
import axios from 'axios'

/* state */
const initialState = {
  data: null,
  updatedAt: null,
  dailyData: null,
  monthlyData: null,
  loading: true,
  error: false
}
export const state = () => Object.assign({}, initialState)

/* mutations */
export const mutations = {
  setData(state, data) {
    state.data = data
  },
  setUpdatedAt(state, updatedAt) {
    state.updatedAt = updatedAt
  },
  setDailyData(state, dailyData) {
    state.dailyData = dailyData
  },
  setMonthlyData(state, monthlyData) {
    state.monthlyData = monthlyData
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setError(state, error) {
    state.error = error
  },
  reset(state) {
    state = Object.assign(state, initialState)
  }
}

/* getters */
export const getters = {
  loading(state) {
    return state.loading
  },
  error(state) {
    return state.error
  },
  topNews(state) {
    const header = process.env.constant.newsList
    const updatedAt = state.updatedAt[0].updatedAt || ''
    let tmpDate = ''
    if (state.data === null) {
      return {
        header: header,
        updatedAt: updatedAt,
        data: state.data
      }
    }

    let retDict = {}
    let cnt = {}
    Object.keys(state.data).forEach(key => {
      const item = {
        img:
          state.data[key].img === ''
            ? process.env.constant.newsImage
            : state.data[key].img,
        date: `${dateString(addSlash(state.data[key].date))}の${
          process.env.constant.newsList
        }`,
        dateSort: state.data[key].date,
        title: state.data[key].title,
        link: `/news/${state.data[key].month}/${state.data[key].date}/`,
        monthLink: `/news/${state.data[key].month}/`,
        service:
          typeof state.data[key].service !== 'undefined'
            ? state.data[key].service
            : ''
      }
      // 日付事の記事数カウント
      if (!cnt[state.data[key].date]) {
        cnt[state.data[key].date] = 1
      } else {
        cnt[state.data[key].date] += 1
      }

      if (!retDict[state.data[key].date]) {
        // データがない場合は必ず入れる
        retDict[state.data[key].date] = item
      } else {
        // データがある場合は画像があれば再度入れ直す
        if (state.data[key].img !== '') {
          retDict[state.data[key].date] = item
        }
      }
    })

    let ret = []
    Object.keys(retDict).forEach(key => {
      // 日付ごとの件数を追加
      retDict[key].cnt = cnt[key]
      // 連想配列から配列にする
      ret.push(retDict[key])
    })

    // TODO:ソート処理まとめる
    // 日付でソート
    ret.sort((a, b) => {
      if (a.dateSort < b.dateSort) {
        return 1
      } else {
        return -1
      }
    })

    const topData = {
      header: header,
      updatedAt: updatedAt,
      data: ret
    }
    return topData
  },

  dailyNews(state) {
    if (state.dailyData === null) {
      return {
        header: process.env.constant.newsList,
        data: state.dailyData
      }
    }

    const header = `${addDateString(state.dailyData[0].date)}の${
      process.env.constant.newsList
    }`
    let ret = []
    Object.keys(state.dailyData).forEach(key => {
      const item = {
        img:
          state.dailyData[key].img === ''
            ? process.env.constant.newsImage
            : state.dailyData[key].img,
        date: dateString(addSlash(state.dailyData[key].date)),
        title: state.dailyData[key].title,
        link: state.dailyData[key].link,
        service:
          typeof state.dailyData[key].service !== 'undefined'
            ? state.dailyData[key].service
            : ''
      }
      ret.push(item)
    })
    const dailyData = {
      header: header,
      data: ret
    }
    return dailyData
  },

  monthlyNews(state) {
    if (state.monthlyData === null) {
      return {
        header: process.env.constant.newsList,
        data: state.monthlyData
      }
    }

    const header = `${addDateString(state.monthlyData[0].month)}の${
      process.env.constant.newsList
    }`
    let tmpDate = []
    if (state.monthlyData === null) {
      return {
        header: header,
        data: state.monthlyData
      }
    }

    let retDict = {}
    let cnt = {}
    Object.keys(state.monthlyData).forEach(key => {
      const item = {
        img:
          state.monthlyData[key].img === ''
            ? process.env.constant.newsImage
            : state.monthlyData[key].img,
        date: `${dateString(addSlash(state.monthlyData[key].date))}の${
          process.env.constant.newsList
        }`,
        dateSort: state.monthlyData[key].date,
        title: state.monthlyData[key].title,
        link: `/news/${state.monthlyData[key].month}/${
          state.monthlyData[key].date
        }/`,
        service:
          typeof state.monthlyData[key].service !== 'undefined'
            ? state.monthlyData[key].service
            : ''
      }
      // 日付事の記事数カウント
      if (!cnt[state.monthlyData[key].date]) {
        cnt[state.monthlyData[key].date] = 1
      } else {
        cnt[state.monthlyData[key].date] += 1
      }

      if (!retDict[state.monthlyData[key].date]) {
        // データがない場合は必ず入れる
        retDict[state.monthlyData[key].date] = item
      } else {
        // データがある場合は画像があれば再度入れ直す
        if (state.monthlyData[key].img !== '') {
          retDict[state.monthlyData[key].date] = item
        }
      }
    })

    let ret = []
    Object.keys(retDict).forEach(key => {
      // 日付ごとの件数を追加
      retDict[key].cnt = cnt[key]
      // 連想配列から配列にする
      ret.push(retDict[key])
    })

    // TODO:ソート処理まとめる
    // 日付でソート
    ret.sort((a, b) => {
      if (a.dateSort < b.dateSort) {
        return 1
      } else {
        return -1
      }
    })

    const monthlyData = {
      header: header,
      data: ret
    }
    return monthlyData
  }
}

/* actions */
export const actions = {
  // トップページ用のニュース記事取得
  async getTopNews({ commit, state }) {
    // トップページは普遍のため
    if (state.data !== null) return

    // 静的ファイルから取得
    commit('setLoading', true)
    // TODO:ファイルの存在チェック
    const topNews = require('~/data/top.json')
    const updatedAt = require('~/data/updatedAt.json')
    commit('setData', topNews)
    commit('setUpdatedAt', updatedAt)
    commit('setLoading', false)
  },

  // 日次のニュース記事取得
  async getDailyNews({ commit, state }, date) {
    // 静的ファイルから取得
    commit('setLoading', true)
    commit('setError', false)
    // 日次もAPI経由にする
    let isOk = false
    for (let i = 0; i < process.env.constant.retryCount; i++) {
      await axios
        .get(`${process.env.conf.url}/data/${date}.json`)
        .then(result => {
          if (result.status === 200) {
            isOk = true
          }
          commit('setDailyData', result.data)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
          commit('setError', true)
        })

      if (isOk) break
    }
  },

  // 月次のニュース記事取得
  async getMonthlyNews({ commit, state }, month) {
    // 静的ファイルから取得
    commit('setLoading', true)
    commit('setError', false)
    // 月次だけなぜかうまく取得できないのでAPI経由にする
    let isOk = false
    for (let i = 0; i < process.env.constant.retryCount; i++) {
      await axios
        .get(`${process.env.conf.url}/data/${month}.json`)
        .then(result => {
          if (result.status === 200) {
            isOk = true
          }
          commit('setMonthlyData', result.data)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
          commit('setError', true)
        })

      if (isOk) break
    }
  }
}
