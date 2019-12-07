<template>
  <v-layout row>
    <v-flex>
      <v-card color="#134b8a">
        <v-card-title>
          <logo />
          <v-spacer/>
          <header-menu />
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/layouts/Logo.vue'
import HeaderMenu from '~/components/layouts/Menu.vue'

export default {
  components: {
    Logo,
    HeaderMenu
  }
}
</script>

<style scoped>
/* ヘッダー下の影を消す */
.v-card {
  box-shadow: initial;
}
.v-sheet {
  border-radius: 0px;
}
</style>
