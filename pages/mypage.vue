<template>
  <div class="main">
    <v-layout align-center column justify-center>
      マイページ<br>
      <button @click="logout">ログアウト</button>
    </v-layout>
  </div>
</template>

<script>
import device from '~/mixins/device'
import Button from '../components/atoms/Button.vue'

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
    user: {
      get() {
        console.log('computed get')
        return this.$store.state.login.user
      },
      set(value) {
        this.$store.commit('login/setUser', value)
      }
    }
  },
  async beforeMount() {
    console.log('beforeMount')
    // ログイン済かどうか
    console.log('this.user')
    console.log(this.user)
    // 未ログインの場合はトップにリダイレクト
    if (this.user === null) {
      this.$router.push(process.env.constant.sitePathHome)
    }
    // this.user = user
    // this.setUser(user)
  },
  methods: {
    logout() {
      console.log('logout')
      console.log(this.$firebase.auth())
      this.$firebase
        .auth()
        .signOut()
        .then(() => {
          console.log('ログアウトしました')
          this.user = null
          // リロード
          location.reload()
        })
        .catch(error => {
          console.log(`ログアウト時にエラーが発生しました (${error})`)
        })
    }
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
