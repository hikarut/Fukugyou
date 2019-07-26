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

    let ret = []
    Object.keys(state.data).forEach(key => {
      if (tmpDate !== state.data[key].date) {
        const item = {
          img:
            state.data[key].img === ''
              ? constant.newsImage
              : state.data[key].img,
          date: `${dateString(addSlash(state.data[key].date))}の複業記事`,
          title: state.data[key].title,
          link: `/news/${state.data[key].month}/${state.data[key].date}`,
          monthLink: `/news/${state.data[key].month}`
        }
        tmpDate = state.data[key].date
        ret.push(item)
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
        header: '複業記事一覧',
        data: state.dailyData
      }
    }

    const header = `${dateString(addSlash(state.dailyData[0].date))}の複業記事`
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
        header: '複業記事一覧',
        data: state.monthlyData
      }
    }

    const header = `${addDateString(state.monthlyData[0].month)}の複業記事`
    let tmpDate = []
    if (state.monthlyData === null) {
      return {
        header: header,
        data: state.monthlyData
      }
    }

    let ret = []
    Object.keys(state.monthlyData).forEach(key => {
      if (tmpDate.indexOf(state.monthlyData[key].date) == -1) {
        const item = {
          img:
            state.monthlyData[key].img === ''
              ? constant.newsImage
              : state.monthlyData[key].img,
          date: `${dateString(
            addSlash(state.monthlyData[key].date)
          )}の複業記事`,
          dateSort: state.monthlyData[key].date,
          title: state.monthlyData[key].title,
          link: `/news/${state.monthlyData[key].month}/${
            state.monthlyData[key].date
          }`
        }
        tmpDate.push(state.monthlyData[key].date)
        ret.push(item)
      }
    })
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
