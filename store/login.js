/* state */
const initialState = {
  uid: null,
  name: null,
  img: null
}
export const state = () => Object.assign({}, initialState)

/* mutations */
export const mutations = {
  setUid(state, uid) {
    console.log('store setUid')
    console.log(uid)
    state.uid = uid
  },
  setName(state, name) {
    state.name = name
  },
  setImg(state, img) {
    state.img = img
  },
  reset(state) {
    state = Object.assign(state, initialState)
  }
}

/* getters */
export const getters = {
  uid: state => state.uid,
  name: state => state.name,
  img: state => state.img
}

/* actions */
// コンポーネントから呼び出す用のメソッド
export const actions = {
  setUid({ commit }, uid) {
    commit('setUid', uid)
  },
  setName({ commit }, name) {
    commit('setName', name)
  },
  setImg({ commit }, img) {
    commit('setImg', img)
  }
}
