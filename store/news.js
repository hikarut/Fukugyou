import { getTopTerm, dateString, addSlash, addDateString } from '~/lib/date'
const constant = require('~/config/constant.json')

/* state */
const initialState = {
  data: null,
  dailyData: null,
  monthlyData: null,
  loading: true
}
export const state = () => Object.assign({}, initialState)

/* mutations */
export const mutations = {
  setData(state, data) {
    state.data = data
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
  reset(state) {
    state = Object.assign(state, initialState)
  }
}

/* getters */
export const getters = {
  loading(state) {
    return state.loading
  },
  topNews(state) {
    const header = '複業(副業)ニュース'
    let tmpDate = ''
    if (state.data === null) {
      return {
        header: header,
        data: state.data
      }
    }

    let retDict = {}
    Object.keys(state.data).forEach(key => {
      const item = {
        img:
          state.data[key].img === '' ? constant.newsImage : state.data[key].img,
        date: `${dateString(addSlash(state.data[key].date))}の複業ニュース`,
        dateSort: state.data[key].date,
        title: state.data[key].title,
        link: `/news/${state.data[key].month}/${state.data[key].date}`,
        monthLink: `/news/${state.data[key].month}`
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
      data: ret
    }
    return topData
  },

  dailyNews(state) {
    if (state.dailyData === null) {
      return {
        header: '複業ニュース一覧',
        data: state.dailyData
      }
    }

    const header = `${dateString(
      addSlash(state.dailyData[0].date)
    )}の複業ニュース`
    let ret = []
    Object.keys(state.dailyData).forEach(key => {
      const item = {
        img:
          state.dailyData[key].img === ''
            ? constant.newsImage
            : state.dailyData[key].img,
        date: dateString(addSlash(state.dailyData[key].date)),
        title: state.dailyData[key].title,
        link: state.dailyData[key].link
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
        header: '複業ニュース一覧',
        data: state.monthlyData
      }
    }

    const header = `${addDateString(state.monthlyData[0].month)}の複業ニュース`
    let tmpDate = []
    if (state.monthlyData === null) {
      return {
        header: header,
        data: state.monthlyData
      }
    }

    let retDict = {}
    Object.keys(state.monthlyData).forEach(key => {
      const item = {
        img:
          state.monthlyData[key].img === ''
            ? constant.newsImage
            : state.monthlyData[key].img,
        date: `${dateString(
          addSlash(state.monthlyData[key].date)
        )}の複業ニュース`,
        dateSort: state.monthlyData[key].date,
        title: state.monthlyData[key].title,
        link: `/news/${state.monthlyData[key].month}/${
          state.monthlyData[key].date
        }`
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
    commit('setData', topNews)
    commit('setLoading', false)
  },

  // 日次のニュース記事取得
  async getDailyNews({ commit, state }, date) {
    // 静的ファイルから取得
    commit('setLoading', true)
    // TODO:ファイルの存在チェック
    const dailyNews = require(`~/data/${date}.json`)
    commit('setDailyData', dailyNews)
    commit('setLoading', false)
  },

  // 月次のニュース記事取得
  async getMonthlyNews({ commit, state }, month) {
    // 静的ファイルから取得
    commit('setLoading', true)
    // TODO:ファイルの存在チェック
    const monthlyNews = require(`~/data/${month}.json`)
    commit('setMonthlyData', monthlyNews)
    commit('setLoading', false)
  }
}
