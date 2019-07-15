import { getTopTerm, dateString, addSlash } from '~/lib/date'

/* state */
const initialState = {
  data: null,
  loading: true
}
export const state = () => Object.assign({}, initialState)

/* mutations */
export const mutations = {
  setData(state, data) {
    state.data = data
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
        const dateStr = addSlash(state.data[key].date)
        const item = {
          img: state.data[key].img,
          // date: dateString(dateStr),
          date: `${dateString(dateStr)}の記事一覧`,
          // title: '複業(副業)記事一覧',
          title: state.data[key].title,
          link: `/news/${state.data[key].date}`
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
    return topData
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
      console.log(data)
      commit('setData', data)
    } catch (err) {
      console.log(err)
    }
    commit('setLoading', false)
  },

  // 日次のニュース記事取得
  async getDailyNews({ commit }, { date }) {
    console.log('getNews')
    try {
      const snapshot = await this.$firestore
        .collection('news')
        .where('date', '=', date)
        .get()

      const data = snapshot.docs.map(doc => {
        return doc.data()
      })
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  },

  // 月次のニュース記事取得
  async getMonthlyNews({ commit }, { month }) {
    console.log('getNews')
    try {
      const snapshot = await this.$firestore
        .collection('news')
        .where('month', '=', month)
        .get()

      const data = snapshot.docs.map(doc => {
        return doc.data()
      })
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }
}
