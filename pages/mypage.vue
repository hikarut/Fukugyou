<template>
  <div class="main">
    <v-layout align-center column justify-center>
      <p class="user-name">{{ name }}</p>
      <v-avatar size="100">
        <img
          :src="img"
          :alt="name"
        >
      </v-avatar>
      <div v-if="favoriteData === null">
        <v-progress-linear :indeterminate="true"/>
      </div>
    </v-layout>

    <div v-if="favoriteData === null">
      <v-progress-linear :indeterminate="true"/>
    </div>
    <div v-else-if="!favoriteData.length" class="no-data">
      データがありません
    </div>
    <v-list v-if="favoriteData !== null" three-line>
      <p class="favorite-list">お気に入りのニュース一覧</p>
      <template v-for="(item, index) in favoriteData">
        <v-list-tile
          :key="item.title"
          avatar
          class="list"
          @click="nuxtLinkGo(`/news/${item.id}`)"
        >
          <list-img :img="item.img" :alt="item.title" @click="deleteItem"/>
          <list-text :date="item.date" :title="item.title" @click="deleteItem" />
          <!-- <out-clip /> -->
        </v-list-tile>
        <v-dialog :key="index + 10"
                  v-model="dialog"
                  width="500"
        >
          <template v-slot:activator="{ on }">
            <div class="delete-link" v-on="on">
              削除
            </div>
          </template>
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              削除
            </v-card-title>

            <v-card-text>
              削除してよろしいですか？
              <v-btn block outline 
                     class="delete-button" 
                     @click="deleteItem(item.id)">
                削除する
              </v-btn>
            </v-card-text>

            <v-divider/>

            <v-card-actions>
              <v-spacer/>
              <v-btn
                color="primary"
                flat
                @click="dialog = false"
              >
                キャンセル
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- エラー対応で暫定でkeyにプラスする -->
        <v-divider v-if="index !== (favoriteData.length - 1) || (index + 1) === 4" :key="index + 100" />

      </template>
    </v-list>
  </div>
</template>

<script>
import Button from '../components/atoms/Button.vue'
import ListImg from '~/components/molecules/ListImg.vue'
import ListText from '~/components/molecules/ListText.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { Button, ListImg, ListText },
  head() {
    return {
      title: 'マイページ',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'マイページ'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'マイページ'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'マイページ'
        }
      ]
    }
  },
  data: () => ({
    picks: null,
    dialog: false
  }),
  computed: {
    ...mapGetters('newsV2', ['favoriteData']),
    ...mapGetters('login', ['uid', 'name', 'img'])
  },
  async beforeMount() {
    // ログイン済かどうか判定して状態をセット
    const user = await this.userInfo()
    // ログイン済かどうか
    if (user === null) {
      this.$router.push(process.env.constant.sitePathHome)
      return
    }

    // お気に入りデータの取得
    await this.$store.dispatch(
      'newsV2/getFavoriteData',
      this.$store.state.login.uid
    )
  },
  methods: {
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
    nuxtLinkGo(path) {
      this.$router.push(path)
    },
    async deleteItem(id) {
      try {
        await this.$firebase
          .firestore()
          .collection(this.$store.state.login.uid)
          .doc('news')
          .collection('data')
          .doc(id)
          .delete()

        // リロード
        location.reload()
      } catch (error) {
        console.log(error)
      }
      this.dialog = false
    },
    ...mapActions('newsV2', ['getFavoriteData'])
  }
}
</script>

<style scoped>
.user-name {
  margin-top: 10px;
}
/* 枠線を消す */
.v-card {
  box-shadow: initial;
}
.list {
  height: 100px;
}
.delete-link {
  text-align: right;
  font-size: 10px;
  margin-top: -5px;
  margin-right: 5px;
  margin-bottom: -15px;
}
.delete-button {
  margin-top: 30px;
  margin-bottom: 20px;
}
.no-data {
  text-align: center;
}
.favorite-list {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
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
