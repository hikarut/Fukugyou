<template>
  <div class="main">
    <v-layout align-center column justify-center>
      <p>{{ this.$store.state.login.name }}</p>
      <v-avatar size="100">
        <img
          :src="this.$store.state.login.img"
          :alt="this.$store.state.login.name"
        >
      </v-avatar>
      <p>
        <button @click="logout">ログアウト</button>
      </p>
    </v-layout>
  </div>
</template>

<script>
import device from '~/mixins/device'
import Button from '../components/atoms/Button.vue'
import { mapMutations } from 'vuex'

export default {
  components: { Button },
  mixins: [device],
  head() {
    return {
      title: process.env.constant.job,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'エンジニア向けの複業・副業案件探し情報をまとめます。副業でプログラミングの仕事を始めたい方におすすめなサイトの情報をまとめます。'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'エンジニア向けの複業・副業案件探し情報をまとめます。副業でプログラミングの仕事を始めたい方におすすめなサイトの情報をまとめます。'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: process.env.constant.job
        }
      ]
    }
  },
  data: () => ({
    picks: null
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
    console.log('beforeMount')
    // ログイン済かどうか判定して状態をセット
    this.user = await this.userInfo()
    // ログイン済かどうか
    if (this.user === null) {
      this.$router.push(process.env.constant.sitePathHome)
    }
  },
  methods: {
    logout() {
      console.log('logout')
      this.$firebase
        .auth()
        .signOut()
        .then(() => {
          console.log('ログアウトしました')
          this.reset()
          // リロード
          location.reload()
        })
        .catch(error => {
          console.log(`ログアウト時にエラーが発生しました (${error})`)
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
    ...mapMutations('login', ['setUid', 'setName', 'setImg', 'reset'])
  }
}
</script>

<style scoped>
/* PC版は横に広がりすぎないようにする */
@media screen and (min-width: 600px) {
  .main {
    width: 80%;
    margin: 0 auto;
  }
}
@media screen and (min-width: 1000px) {
  .main {
    width: 60%;
    margin: 0 auto;
  }
}
</style>
