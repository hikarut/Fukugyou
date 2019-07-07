/* state */
const initialState = {
  data: null
}
export const state = () => Object.assign({}, initialState)

/* mutations */
export const mutations = {
  setName(state, name) {
    state.name = name
  },
  setMail(state, mail) {
    state.mail = mail
  },
  setContents(state, contents) {
    state.contents = contents
  },
  reset(state) {
    state = Object.assign(state, initialState)
  }
}

/* actions */
export const actions = {
  async getNews({ commit }) {
    const ret = this.$firestore
      .collection('news')
      .doc('20190630')
      .collection('data')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data())
        })
      })
      .catch(err => {
        console.log('Error getting documents', err)
      })
    console.log(ret)
  }
}
