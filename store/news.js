import { getTopTerm, dateString, addSlash, addDateString } from '~/lib/date'

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
    console.log('getters topNews')
    const header = '複業(副業)ニュース'
    let tmpDate = ''
    if (state.data === null) {
      console.log('getters topNews null')
      return {
        header: header,
        data: state.data
      }
    }

    let ret = []
    Object.keys(state.data).forEach(key => {
      if (tmpDate !== state.data[key].date) {
        const item = {
          img: state.data[key].img,
          // date: dateString(dateStr),
          date: `${dateString(addSlash(state.data[key].date))}の記事一覧`,
          // title: '複業(副業)記事一覧',
          title: state.data[key].title,
          link: `/news/${state.data[key].date.substr(0, 6)}/${
            state.data[key].date
          }`
        }

        // 画像が空だったら次の記事の画像を取るためループを続ける
        if (state.data[key].img !== '') {
          tmpDate = state.data[key].date
          ret.push(item)
        }
      }
    })
    console.log(`getters ret：${ret.length}`)
    const topData = {
      header: header,
      data: ret
    }
    return topData
  },

  dailyNews(state) {
    console.log('getters dailyNews')
    if (state.dailyData === null) {
      console.log('getters dailyNews null')
      return {
        header: '記事一覧',
        data: state.dailyData
      }
    }

    const header = `${dateString(addSlash(state.dailyData[0].date))}の記事一覧`
    let ret = []
    Object.keys(state.dailyData).forEach(key => {
      const item = {
        img: state.dailyData[key].img,
        date: `${dateString(addSlash(state.dailyData[key].date))}の記事`,
        title: state.dailyData[key].title,
        link: state.dailyData[key].link
      }
      ret.push(item)
    })
    const dailyData = {
      header: header,
      data: ret
    }
    console.log(`getters ret：${ret.length}`)
    return dailyData
  },

  monthlyNews(state) {
    if (state.monthlyData === null) {
      return {
        header: '記事一覧',
        data: state.monthlyData
      }
    }

    const header = `${addDateString(state.monthlyData[0].month)}の記事一覧`
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
          img: state.monthlyData[key].img,
          date: `${dateString(
            addSlash(state.monthlyData[key].date)
          )}の記事一覧`,
          dateSort: state.monthlyData[key].date,
          title: state.monthlyData[key].title,
          link: `/news/${state.monthlyData[key].date.substr(0, 6)}/${
            state.monthlyData[key].date
          }`
        }

        // 画像が空だったら次の記事の画像を取るためループを続ける
        if (state.monthlyData[key].img !== '') {
          tmpDate.push(state.monthlyData[key].date)
          ret.push(item)
        }
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
  async getTopNews({ commit }) {
    console.log('actions getTopNews')
    commit('setLoading', true)
    const { start, end } = getTopTerm()
    try {
      const snapshot = await this.$firestore
        .collection('news')
        .where('date', '>=', start)
        .where('date', '<=', end)
        .orderBy('date', 'desc')
        .get()

      const data = snapshot.docs.map(doc => {
        return doc.data()
      })
      commit('setData', data)
      console.log('setData')
      console.log(`actions ret：${data.length}`)
    } catch (err) {
      console.log(err)
    }
    commit('setLoading', false)
  },

  // 日次のニュース記事取得
  async getDailyNews({ commit }, date) {
    console.log('actions getDailyNews')
    console.log(date)
    commit('setLoading', true)
    try {
      const snapshot = await this.$firestore
        .collection('news')
        .where('date', '==', date)
        .get()

      const data = snapshot.docs.map(doc => {
        return doc.data()
      })
      commit('setDailyData', data)
      console.log('setDailyData')
      console.log(`actions ret：${data.length}`)
    } catch (err) {
      console.log(err)
    }
    commit('setLoading', false)
  },

  // 月次のニュース記事取得
  async getMonthlyNews({ commit }, month) {
    commit('setLoading', true)
    try {
      const snapshot = await this.$firestore
        .collection('news')
        .where('month', '==', month)
        .get()

      const data = snapshot.docs.map(doc => {
        return doc.data()
      })
      commit('setMonthlyData', data)
    } catch (err) {
      console.log(err)
    }
    commit('setLoading', false)
  }
}
