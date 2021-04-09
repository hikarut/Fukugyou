<template>
  <div>
    <div v-if="storeUser">
      <nuxt-link to="mypage">ログイン済</nuxt-link>
    </div>
    <button v-if="storeUser === null" @click="login">
      ログイン
    </button>
    <button @click="test">
      test
    </button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data: () => ({
    user: null
    // isLogin: false
  }),
  computed: {
    storeUser: {
      get() {
        console.log('computed get')
        return this.$store.state.login.user
      },
      set(value) {
        this.$store.commit('login/setUser', value)
      }
    }
  },
  // async mounted() {
  async beforeMount() {
    console.log('beforeMount')
    // ログイン済かどうか
    // const user = firebase.auth().currentUser
    // this.user = await this.userInfo()
    // console.log(this.user)

    const user = await this.userInfo()
    console.log('user')
    console.log(user)
    console.log('sotreUser')
    this.storeUser = user
    // this.setUser(user)
  },
  methods: {
    test() {
      console.log('test')
      // this.$store.commit('login/setUser', 'testaaaa')
      console.log('get user')
      console.log(this.$store.state.login.user)
    },
    login() {
      console.log('login')
      const provider = new this.$firebase.auth.GoogleAuthProvider()
      this.$firebase
        .auth()
        // .signInWithPopup(provider)
        .signInWithRedirect(provider)
        .then(result => {
          const credential = result.credential
          const token = credential.accessToken
          const user = result.user
          console.log(credential)
          console.log(token)
          console.log('user')
          console.log(user)
          // ユーザー情報のセット
          // this.user = user
          // this.setUser(user)
          // this.$store.commit('login/setUser', user)
          this.storeUser = user
          // リロード
          // console.log('reload start')
          // location.reload()
          // console.log('reload end')
        })
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message
          const email = error.email
          const credential = error.credential
          console.log(errorMessage)
        })
    },
    async userInfo() {
      if (this.$store.state.login.user !== null) {
        return this.$store.state.login.user
      }
      return new Promise((resolve, reject) => {
        this.$firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            console.log('User is signed in.')
            // return user
            // オブジェクトをstoreに入れるとエラーになる
            resolve(user.uid)
            // resolve(null)
          } else {
            console.log('No user is signed in')
            // return null
            resolve(null)
          }
        })
      })
    },
    ...mapMutations('login', ['setUser', 'setName', 'setImg'])
  }
}
</script>

<style lang="scss" scoped>
</style>
