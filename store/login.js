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
