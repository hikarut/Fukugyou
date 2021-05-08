<template>
  <div>
    <div v-if="uid">
      <v-menu absolute offset-y>
        <template v-slot:activator="{ on, attrs }">
          <nuxt-link to="">
            <v-avatar v-bind="attrs" size="30"
                      v-on="on">
              <img
                :src="img"
                :alt="name"
              >
            </v-avatar>
          </nuxt-link> 
        </template>
        <v-list>
          <v-list-tile>
            <nuxt-link to="/mypage/"><v-list-tile-title class="menu-link">マイページ</v-list-tile-title></nuxt-link>
          </v-list-tile>
          <v-list-tile>
            <nuxt-link to=""><v-list-tile-title class="menu-link" @click="logout">ログアウト</v-list-tile-title></nuxt-link>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>
    <button v-if="uid === null">
      <login-modal />
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LoginModal from '~/components/molecules/LoginModal.vue'

export default {
  components: {
    LoginModal
  },
  computed: {
    ...mapGetters('login', ['uid', 'name', 'img']),
    ...mapActions('login', ['reset'])
  },
  methods: {
    logout() {
      this.$firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch('login/reset')
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

<style lang="scss" scoped>
button {
  color: $white;
}
.menu-link {
  color: $black;
}
</style>
