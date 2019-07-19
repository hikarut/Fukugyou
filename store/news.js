import { getTopTerm, dateString, addSlash } from '~/lib/date'

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
    const topData = {
      header: header,
      data: ret
    }
    console.log('topData')
    return topData
  },
  dailyNews(state) {
    const header = `${dateString(addSlash(state.dailyData[0].date))}の記事一覧`
    const dailyData = {
      header: header,
      data: state.dailyData
    }
    console.log('getters dailyData')
    console.log(dailyData)
    return dailyData
  },
  monthlyNews(state) {
    return state.monthlyData
  }
}

/* actions */
export const actions = {
  // トップページ用のニュース記事取得
  async getTopNews({ commit }) {
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
    } catch (err) {
      console.log(err)
    }
    commit('setLoading', false)
  },

  // 日次のニュース記事取得
  async getDailyNews({ commit }, date) {
    commit('setLoading', true)
    console.log('getDailyNews')
    try {
      const snapshot = await this.$firestore
        .collection('news')
        .where('date', '==', date)
        .get()

      const data = snapshot.docs.map(doc => {
        return doc.data()
      })
      commit('setDailyData', data)
    } catch (err) {
      console.log(err)
    }
    commit('setLoading', false)
  },

  // 月次のニュース記事取得
  async getMonthlyNews({ commit }, { month }) {
    console.log('getMonthlyNews')
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
      console.log(data)
    } catch (err) {
      console.log(err)
    }
    commit('setLoading', false)
  }
}
