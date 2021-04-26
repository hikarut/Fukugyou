<template>
  <div>
    <div v-if="user">
      <nuxt-link to="/mypage">
        <v-avatar size="30">
          <img
            :src="this.$store.state.login.img"
            :alt="this.$store.state.login.name"
          >
        </v-avatar>
      </nuxt-link> 
    </div>
    <button v-if="user === null">
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
                ログイン
              </span>
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
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import ButtonLink from '~/components/atoms/Button.vue'
import GoogleLoginBtn from '~/components/atoms/GoogleLoginBtn.vue'
import TwitterLoginBtn from '~/components/atoms/TwitterLoginBtn.vue'
import GitHubLoginBtn from '~/components/atoms/GitHubLoginBtn.vue'

export default {
  components: {
    ButtonLink,
    GoogleLoginBtn,
    TwitterLoginBtn,
    GitHubLoginBtn
  },
  data: () => ({
    dialog: false
  }),
  computed: {
    // TODO:共通化
    user: {
      get() {
        return this.$store.state.login.uid
      },
      set(user) {
        const uid = user ? user.uid : null
        const name = user ? user.displayName : null
        const img = user ? user.photoURL : null
        this.setUid(uid)
        this.setName(name)
        this.setImg(img)
      }
    }
  },
  async beforeMount() {
    // ログイン済かどうか判定して状態をセット
    this.user = await this.userInfo()
  },
  methods: {
    loginGoogle() {
      console.log('login')
      const provider = new this.$firebase.auth.GoogleAuthProvider()
      this.$firebase
        .auth()
        // .signInWithPopup(provider)
        .signInWithRedirect(provider)
        .then(result => {
          // ユーザー情報のセット
          this.user = result.user
        })
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message
          const email = error.email
          const credential = error.credential
          console.log(errorMessage)
        })
    },
    loginTwitter() {
      console.log('loginTwitter')
      const provider = new this.$firebase.auth.TwitterAuthProvider()
      console.log(provider)
      this.$firebase
        .auth()
        .signInWithRedirect(provider)
        .then(result => {
          console.log('loginTwitter result')
          console.log(result)
          // ユーザー情報のセット
          this.user = result.user
        })
        .catch(error => {
          console.log('loginTwitter error')
          const errorCode = error.code
          const errorMessage = error.message
          const email = error.email
          const credential = error.credential
          console.log(errorMessage)
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
        .then(result => {
          console.log('loginGitHub result')
          console.log(result)
          // ユーザー情報のセット
          this.user = result.user
        })
        .catch(error => {
          console.log('loginGitHub error')
          const errorCode = error.code
          const errorMessage = error.message
          const email = error.email
          const credential = error.credential
          console.log(errorMessage)
        })
    },
    async userInfo() {
      if (this.$store.state.login.uid !== null) {
        // すでにログインずみの場合の処理　画像や名前のセット
        // return this.$store.state.login.uid
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
    ...mapMutations('login', ['setUid', 'setName', 'setImg'])
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
