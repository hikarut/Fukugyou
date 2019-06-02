/* state */
const initialState = {
  name: '',
  mail: '',
  contents: ''
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
  }
}
