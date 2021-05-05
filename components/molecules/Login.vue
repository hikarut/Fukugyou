<template>
  <div>
    <div v-if="uid">
      <nuxt-link to="/mypage">
        <v-avatar size="30">
          <img
            :src="img"
            :alt="name"
          >
        </v-avatar>
      </nuxt-link> 
    </div>
    <button v-if="uid === null">
      <login-modal />
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoginModal from '~/components/molecules/LoginModal.vue'

export default {
  components: {
    LoginModal
  },
  computed: {
    ...mapGetters('login', ['uid', 'name', 'img'])
  }
}
</script>

<style lang="scss" scoped>
button {
  color: $white;
}
</style>
