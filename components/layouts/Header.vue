<template>
  <v-layout row>
    <v-flex>
      <v-card class="header-area">
        <v-card-title>
          <logo />
          <v-spacer/>
          <login />
          <header-menu />
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Login from '~/components/atoms/Login.vue'
import Logo from '~/components/layouts/Logo.vue'
import HeaderMenu from '~/components/layouts/Menu.vue'

export default {
  components: {
    Login,
    Logo,
    HeaderMenu
  }
}
</script>

<style lang="scss" scoped>
.header-area {
  background: $mainColor !important;
}
/* ヘッダー下の影を消す */
.v-card {
  box-shadow: initial;
}
.v-sheet {
  border-radius: 0px;
}
.v-card__title {
  padding: 5px;
}
</style>
