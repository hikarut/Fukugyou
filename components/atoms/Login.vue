<template>
  <div>
    <div v-if="user">
      <nuxt-link to="mypage">
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
                color="red lighten-2"
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

              <div @click="login">
                <button-link text="Google ログイン" />
              </div>

              <v-card-actions>
                <v-spacer/>
                <v-btn
                  color="primary"
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

export default {
  components: { ButtonLink },
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
        console.log('set user')
        console.log(user)
        console.log(uid)
        this.setUid(uid)
        this.setName(name)
        this.setImg(img)
      }
    }
  },
  async beforeMount() {
    // ログイン済かどうか判定して状態をセット
    this.user = await this.userInfo()
    console.log('beforeMount')
    console.log(this.user)
    console.log(this.$store.state.login.uid)
  },
  methods: {
    modal() {
      console.log('modal')
    },
    login() {
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
button {
  color: $white;
}
</style>
