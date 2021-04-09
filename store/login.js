/* state */
const initialState = {
  user: null,
  name: '',
  img: ''
}
export const state = () => Object.assign({}, initialState)

/* mutations */
export const mutations = {
  setUser(state, user) {
    console.log('store setUser')
    console.log(user)
    state.user = user
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
