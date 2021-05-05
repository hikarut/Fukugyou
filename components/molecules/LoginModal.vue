<template>
  <button>
    <no-ssr>
      <div class="text-center">
        <v-dialog
          v-model="dialog"
          width="500"
        >
          <template v-slot:activator="{ on, attrs }" v-on="on">
            <span
              v-bind="attrs"
              color="lighten-2"
              dark
              v-on="on"
            >
              <template v-if="!loading">
                ログイン
              </template>
            </span>
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="primary"
            />
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2">
              ログイン
            </v-card-title>

            <v-divider/>

            <div class="login-button top" @click="loginGoogle">
              <google-login-btn />
            </div>
            <div class="login-button" @click="loginTwitter">
              <twitter-login-btn />
            </div>
            <div class="login-button" @click="loginGitHub">
              <git-hub-login-btn />
            </div>

            <v-card-actions class="cancel-card">
              <v-spacer/>
              <v-btn
                color="primary"
                class="cancel-button"
                text
                @click="dialog = false"
              >
                キャンセル
              </v-btn>
            </v-card-actions>

          </v-card>

        </v-dialog>
      </div>
    </no-ssr>
  </button>
</template>

<script>
import { mapActions } from 'vuex'
import GoogleLoginBtn from '~/components/atoms/GoogleLoginBtn.vue'
import TwitterLoginBtn from '~/components/atoms/TwitterLoginBtn.vue'
import GitHubLoginBtn from '~/components/atoms/GitHubLoginBtn.vue'

export default {
  components: {
    GoogleLoginBtn,
    TwitterLoginBtn,
    GitHubLoginBtn
  },
  data: () => ({
    dialog: false,
    loading: false
  }),
  async beforeMount() {
    this.loading = true
    // ログイン済かどうか判定して状態をセット
    const user = await this.userInfo()
    const uid = user ? user.uid : null
    const name = user ? user.displayName : null
    const img = user ? user.photoURL : null
    this.$store.dispatch('login/setUid', uid)
    this.$store.dispatch('login/setName', name)
    this.$store.dispatch('login/setImg', img)
    this.loading = false
  },
  methods: {
    loginGoogle() {
      console.log('login')
      const provider = new this.$firebase.auth.GoogleAuthProvider()
      this.$firebase
        .auth()
        // .signInWithPopup(provider)
        .signInWithRedirect(provider)
        .then(result => {})
        .catch(error => {
          console.log(error)
        })
    },
    loginTwitter() {
      console.log('loginTwitter')
      const provider = new this.$firebase.auth.TwitterAuthProvider()
      console.log(provider)
      this.$firebase
        .auth()
        .signInWithRedirect(provider)
        .then(result => {})
        .catch(error => {
          console.log(error)
        })
    },
    loginGitHub() {
      console.log('loginGitHub')
      const provider = new this.$firebase.auth.GithubAuthProvider()
      provider.setCustomParameters({
        allow_signup: 'true'
      })
      console.log(provider)
      this.$firebase
        .auth()
        .signInWithRedirect(provider)
        .then(result => {})
        .catch(error => {
          console.log(error)
        })
    },
    async userInfo() {
      if (this.$store.state.login.uid !== null) {
        // TODO：すでにログインずみの場合の処理　画像や名前のセット
      }
      return new Promise((resolve, reject) => {
        this.$firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            console.log('User is signed in.')
            // オブジェクトをstoreに入れるとエラーになる
            // resolve(user.uid)
            resolve(user)
          } else {
            console.log('No user is signed in')
            resolve(null)
          }
        })
      })
    },
    ...mapActions('login', ['setUser', 'setUid', 'setName', 'setImg'])
  }
}
</script>

<style lang="scss" scoped>
.login-button {
  width: 60%;
  margin: 0 auto;
  margin-top: 20px;
}
.top {
  margin-top: 30px;
}
button {
  color: $white;
}
.headline {
  font-size: 14px !important;
  line-height: 5px !important;
}
.cancel-card {
  margin-top: 30px;
}
.cancel-button {
  height: 25px;
}
</style>
